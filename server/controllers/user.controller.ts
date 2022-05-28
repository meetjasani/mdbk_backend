import { Request, Response } from 'express'
import httpStatus from 'http-status';
import { UserService } from '../services'

export class UserController {

    public userService = new UserService()
    /**
     * @return Success : data
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */
    public getAllUser = async (req: Request, res: Response): Promise<void> => {
        this.userService
            .getAllUser()
            .then((data) => {
                res.status(httpStatus.OK).send({
                    "status": "success",
                    "data": data
                });
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
     * @param {Id} req.params.Id
     * @return Success : data
     * @return Error : error
     */
    public getUserById = async (req: Request, res: Response): Promise<void> => {
        const Id = parseInt(req.params.Id);
        this.userService
            .getUserById(Id)
            .then((data) => {
                res.status(httpStatus.OK).send({
                    "status": "success",
                    "data": data[0]
                });
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
     * @input : Form( Object ) : req.body
     * @return Success : {departmentName: x,hodId:x,createdAt: x,createdBy: x,updatedAt:x,updatedBy:x}
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */
    public createUser = async (req: Request, res: Response): Promise<void> => {
        const user = req.body
        const createUserData = {
            name: user.userName,
            email: user.userEmail,
            user_name: user.userName,
            password: user.userPassword,
            phone: user.userPhone,
            employee_type: user.userEmployeeType,
            login_type: user.userLoginType,
            role: user.userRole,
            status: user.userStatus,
        };
        this.userService
            .createUser(createUserData)
            .then((userData) => {
                res.status(httpStatus.CREATED).send({
                    "status": "success",
                    "message": "User created successfully!!",
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

    /**
     * @input : Form( Object ) : 
     * @return Success : { result: [1] }
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */
    public updateUser = async (req: Request, res: Response): Promise<void> => {
        const user = req.body
        const filter = { where: { id: req.params.Id } }
        const updateUserData = {
            name: user.userName,
            email: user.userEmail,
            user_name: user.userName,
            password: user.userPassword,
            phone: user.userPhone,
            employee_type: user.userEmployeeType,
            login_type: user.userLoginType,
            role: user.userRole,
            status: user.userStatus,
        }
        this.userService
            .updateUser(updateUserData, filter)
            .then((userData) => {
                res.status(httpStatus.OK).send({
                    "status": "success",
                    "message": 'User updated successfully!!'
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

    /**
     * @param  {Number} req.params.Id
     * @return Success : { result: [1] }
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */
    public deleteUser = async (req: Request, res: Response): Promise<void> => {
        const Id = parseInt(req.params.Id);
        const filter = { where: { id: Id } }
        this.userService
            .deleteUser(filter)
            .then((userData) => {
                res.status(httpStatus.OK).send({
                    "status": "success",
                    "message": 'User deleted successfully!!'
                });
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
     * @param  {Number} req.params.Id
     * @return Success : { result: [1] }
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */
    public deleteAllUsers = async (req: Request, res: Response): Promise<void> => {
        const Ids: string = req.body.Id;
        const IdArr: string[] = Ids.split(',');
        const filter: any = { where: { id: IdArr } }

        this.userService
            .deleteAllUsers(filter)
            .then((userData) => {
                res.status(httpStatus.OK).send({
                    "status": "success",
                    "message": 'All Users deleted successfully!!'
                });
            }).catch((err) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                    "error": {
                        "status": "failure",
                        "message": err.message
                    }
                });
            });
    };

}