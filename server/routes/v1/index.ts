import { Router } from 'express'
import httpStatus from 'http-status'
import config from '../../config/config'
import jwt from 'jsonwebtoken'
import * as memberService from '../../services/member.service'
import memberRoute from './member.route'
import clientProfileRoute from './clientProfile.route'
import sideCharacterProfileRoute from './sideCharacterProfile.route'
import messageRoute from './message.route'
import searchOptionRoute from './searchOption.route'
import requestRoute from './request.route'
import userRoute from './user.route'
import provinceRoute from './province.route'
import districtRoute from './district.route'

const router = Router();
const JWT_KEY = config.jwt.secret

const allowPaths = [
    '/member/isEmailRegistered',
    '/member/registerMember',
    '/member/login',
    '/member/verifyEmail',
    '/member/generateVerificationCode',
    '/clientProfile/byMemberId',
    '/clientProfile/create',
    '/province',
    '/province/create',
    '/district',
    '/district/create',
    '/district/alldistrict/:Id',
    '/clientProfile/generateVerificationCode',
    '/clientProfile/verifyPhone',
    '/message/create',
    '/message/memberId'
]


router.use((req, res, next) => {
    if (allowPaths.includes(req.path)) {
        next()
    } else {
        next()
        // memberService
        //     .validateAccess(req.cookies.authorization) // Authenitication Using Cookie
        //     .then((response: any) => {
        //         const token = jwt.sign({ id: response.id, email: response.email }, JWT_KEY, { expiresIn: '1h' })
        //         /* req.email = response.email
        //         req.memberId = response.memberId
        //         req.memberName = response.name
        //         res.cookie('authorization', token, {
        //             expires: new Date(Date.now() + 1500000)
        //         }) */
        //         next()
        //     })
        //     .catch((error: any) => {
        //         res.status(httpStatus.UNAUTHORIZED).send({ error: { code: httpStatus.UNAUTHORIZED, message: 'Not Authorized' } })
        //     })
    }
});

router.use('/member', memberRoute)
router.use('/clientProfile', clientProfileRoute)
router.use('/sideCharacProfile', sideCharacterProfileRoute)
router.use('/message', messageRoute)
router.use('/searchOption', searchOptionRoute)
router.use('/request', requestRoute)
router.use('/user', userRoute)
router.use('/province', provinceRoute)
router.use('/district', districtRoute)

export default router
