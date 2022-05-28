import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status';
import { MemberService, TokenService, EmailService } from '../services/'
import bcrypt from 'bcryptjs';
import passport from 'passport';
import { googleStrategy, facebookStrategy, kakaoStrategy } from './../config/passport';

export class MemberController {

    public memberService = new MemberService()
    public tokenService = new TokenService()
    public emailService = new EmailService()
    /**
     * Check Email is register or not
     * @return Success : Boolean
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */

    public isEmailRegistered = async (req: Request, res: Response): Promise<void> => {
        const { email }: { email: string } = req.body;
        this.memberService
            .getMemberByEmail(email)
            .then((data) => {
                if (data.length > 0) {
                    res.status(httpStatus.OK).send({
                        "status": "success",
                        "data": true
                    });
                } else {
                    res.status(httpStatus.OK).send({
                        "status": "success",
                        "data": false
                    });
                }
            })
            .catch((err) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                    "error": {
                        "status": "failure",
                        "message": err.message
                    }
                });
            });
    };

    /**
     * Generate Email Verification Code
     * @return Success : number
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */

    public generateVerificationCode = async (req: Request, res: Response): Promise<void> => {
        const { email }: { email: string } = req.body;
        let code: number = Math.floor(1000 + Math.random() * 9000);
        // send email code 
        let emailResult = this.emailService.sendEmailVerification(email, code).then((data) => {
            // Store in session
            // req.session.emailVerification = {
            //     email: email,
            //     code: code
            // };
            res.status(httpStatus.OK).send({ "status": "success", 'code': code });
        }).catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                "error": {
                    "status": "failure",
                    "message": err.message
                }
            });
        });
    };

    /**
     * verify email
     * @return Success : verified message
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */

    public verifyEmail = async (req: Request, res: Response): Promise<void> => {
        const { email, code, prevCode, previousEmail }: { email: string, code: number, prevCode: number, previousEmail: string } = req.body;
        if (
            previousEmail && previousEmail == email &&
            prevCode && prevCode == code) {
            res.status(httpStatus.OK).send({
                "status": "success",
                "data": "Email verified"
            });
        } else {
            res.status(httpStatus.BAD_REQUEST).send({
                "status": "failure",
                "data": "Invalid code"
            });
        }
    };

    /**
     * Member registration
     * @return Success : verified message
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */

    public registerMember = async (req: Request, res: Response): Promise<void> => {
        const { name, email, password }: { name: string, email: string, password: string } = req.body;
        this.memberService
            .getMemberByEmail(email)
            .then(async (data) => {
                if (data.length == 0) {
                    const hashedPassword: string = await bcrypt.hash(password, 8);
                    const memberData = {
                        name: name,
                        email: email,
                        password: hashedPassword
                    }
                    this.memberService
                        .createMember(memberData).then((data) => {
                            res.status(httpStatus.OK).send({
                                "status": "success",
                                "data": "Member registration successfull"
                            });
                        }).catch((err) => {
                            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                                "error": {
                                    "status": "failure",
                                    "message": err.message
                                }
                            });
                        });
                } else {
                    res.status(httpStatus.BAD_REQUEST).send({
                        "error": {
                            "status": "failure",
                            "message": "email already exists"
                        }
                    });
                }
            }).catch((err) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                    "error": {
                        "status": "failure",
                        "message": err.message
                    }
                });
            });
    };

    /**
     * Member Login
     * @return Success : token
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */

    public login = async (req: Request, res: Response): Promise<void> => {
        const { email, password }: { email: string, password: string } = req.body;
        this.memberService
            .getMemberByEmail(email)
            .then((data: any) => {
                if (data.length > 0) {
                    this.memberService
                        .checkPassword(password, data[0].password)
                        .then((isPasswordMatch) => {
                            if (isPasswordMatch) {
                                this.tokenService.generateAuthTokens(data[0])
                                    .then((tokens: any) => {
                                        res.cookie('authorization', tokens.token, {
                                            expires: new Date(Date.now() + 1800000),
                                        }).send({ result: true, token: tokens.token });
                                    });
                            } else {
                                res.status(httpStatus.UNAUTHORIZED).send({
                                    "error": {
                                        "status": "failure",
                                        "message": 'Incorrect email or password'
                                    }
                                });
                            }
                        }).catch((err) => {
                            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                                "error": {
                                    "status": "failure",
                                    "message": err.message
                                }
                            });
                        });
                } else {
                    res.status(httpStatus.BAD_REQUEST).send({
                        "error": {
                            "status": "failure",
                            "message": 'No User found'
                        }
                    });
                }
            }).catch((err) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                    "error": {
                        "status": "failure",
                        "message": err.message
                    }
                });
            });
    };

    /**
     * Member Login with google
     * @return Success : Google User Object
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */

    public google = async (req: Request, res: Response, next: NextFunction) => {
        passport.use(googleStrategy);
        const { redirectTo } = req.query;
        const state = JSON.stringify({ redirectTo });
        const authenticator = passport.authenticate('google', { scope: ['profile', 'email'], state, session: true });
        authenticator(req, res, next);
    };

    /**
     * Google Callback
     * @return Success : Member login token
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */

    public googleCallback = async (req: Request, res: Response, next: NextFunction) => {
        let user: any = req.user;
        if (user && user._json && user._json.email_verified) {
            const userEmail = user._json.email;
            const userName = user._json.name;
            this.memberService
                .getMemberByEmail(userEmail)
                .then((data) => {
                    if (data) {
                        this.tokenService.generateAuthTokens(data)
                            .then((tokens: any) => {
                                res.cookie('authorization', tokens.token, {
                                    expires: new Date(Date.now() + 1800000),
                                }).send({ result: true, token: tokens.token });
                            });
                    } else {
                        // If email not found then register
                        const memberData: any = {
                            name: userEmail,
                            email: userEmail,
                            login_type: 'google'
                        }
                        this.memberService
                            .createMember(memberData).then((data) => {
                                res.status(httpStatus.OK).send({
                                    "status": "success",
                                    "data": "Member resignation successfully"
                                });
                            }).catch((err) => {
                                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                                    "error": {
                                        "status": "failure",
                                        "message": err.message
                                    }
                                });
                            });
                    }
                });
        } else {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                "error": {
                    "status": "failure",
                    "message": 'No User found'
                }
            });
        }
    }

    /**
     * Member Login with facebook
     * @return Success : Facebook User Object
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */

    public facebook = async (req: Request, res: Response, next: NextFunction) => {
        passport.use(facebookStrategy);
        const { redirectTo } = req.query;
        const state = JSON.stringify({ redirectTo });
        const authenticator = passport.authenticate('facebook', { scope: ['public_profile', 'email'], state, session: true });
        authenticator(req, res, next);
    };

    /**
     * Facebook Callback
     * @return Success : Member login token
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */

    public facebookCallback = async (req: Request, res: Response, next: NextFunction) => {
        let user: any = req.user;
        if (user && user._json && user._json.email) {
            const userEmail = user._json.email;
            const userName = user._json.name;
            this.memberService
                .getMemberByEmail(userEmail)
                .then((data) => {
                    if (data) {
                        this.tokenService.generateAuthTokens(data)
                            .then((tokens: any) => {
                                res.cookie('authorization', tokens.token, {
                                    expires: new Date(Date.now() + 1800000),
                                }).send({ result: true, token: tokens.token });
                            });
                    } else {
                        // If email not found then register
                        const memberData: any = {
                            name: userName,
                            email: userEmail,
                            login_type: 'facebook'
                        }
                        this.memberService
                            .createMember(memberData).then((data) => {
                                res.status(httpStatus.OK).send({
                                    "status": "success",
                                    "data": "Member resignation successfully"
                                });
                            }).catch((err) => {
                                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                                    "error": {
                                        "status": "failure",
                                        "message": err.message
                                    }
                                });
                            });
                    }
                });
        } else {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                "error": {
                    "status": "failure",
                    "message": 'No User found'
                }
            });
        }
    }

    /**
     * Member Login with apple
     * @return Success : Facebook User Object
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */

    public apple = async (req: Request, res: Response, next: NextFunction) => {
        passport.use(kakaoStrategy);
        const { redirectTo } = req.query;
        const state = JSON.stringify({ redirectTo });
        const authenticator = passport.authenticate('apple');
        authenticator(req, res, next);
    };

    /**
     * Apple Callback
     * @return Success : Member login token
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */
    public appleCallback = async (req: Request, res: Response, next: NextFunction) => {
        res.send('apple callback');
    }

    /**
     * Member Login with Kakao
     * @return Success : Facebook User Object
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */

    public kakao = async (req: Request, res: Response, next: NextFunction) => {
        passport.use(kakaoStrategy);
        const { redirectTo } = req.query;
        const state = JSON.stringify({ redirectTo });
        const authenticator = passport.authenticate('kakao');
        // const authenticator = passport.authenticate('kakao', { scope: ['email'], state, session: true });
        authenticator(req, res, next);
    };

    /**
     * Kakao Callback
     * @return Success : Member login token
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */
    public kakaoCallback = async (req: Request, res: Response, next: NextFunction) => {
        console.log(req);
        res.send('apple callback');
    }
}