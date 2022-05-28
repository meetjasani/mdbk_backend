import { Router } from 'express'
import config from '../../config/config'
import { MemberController } from '../../controllers/members.controller'
import passport from 'passport'
const router = Router();

const membersController = new MemberController();

router.route('/isEmailRegistered').post(membersController.isEmailRegistered);
router.route('/generateVerificationCode').post(membersController.generateVerificationCode);
router.route('/verifyEmail').post(membersController.verifyEmail);
router.route('/registerMember').post(membersController.registerMember);
router.route('/login').post(membersController.login);
router.route('/google').get(membersController.google);
router.route('/google/callback').get(passport.authenticate('google', { failureRedirect: `${config.url_host}/login` }), membersController.googleCallback);
router.route('/facebook').get(membersController.facebook);
router.route('/facebook/callback').get(passport.authenticate('facebook', { failureRedirect: `${config.url_host}/login` }), membersController.facebookCallback);
router.route('/kakao').get(membersController.kakao);
router.route('/kakao/callback').get(passport.authenticate('kakao', { failureRedirect: `${config.url_host}/login` }), membersController.kakaoCallback);

export default router
