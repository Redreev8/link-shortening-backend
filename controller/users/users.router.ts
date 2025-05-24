import { Router } from 'express'
import {
    register,
    login,
    logut,
    putChangeRoleUser,
    getUserData,
} from './users.controller'
import { body, header } from 'express-validator'
import checkActionRole from '../../middleware/check-action-role'

const router = Router()

export const headerToken = header('auth-token').isString().isLength({ min: 70 })

router.get(
    '/user/',
    [headerToken, checkActionRole(['auth-token'])],
    getUserData,
)

router.post(
    '/register/',
    [
        body('name', '').isString().isLength({ min: 2, max: 50 }),
        body('password', '').isString().isLength({ min: 2, max: 255 }),
    ],
    register,
)

router.post(
    '/login/',
    [
        body('name', '').isString().isLength({ min: 2, max: 50 }),
        body('password', '').isString().isLength({ min: 2, max: 255 }),
    ],
    login,
)

router.put(
    '/user/change-role/',
    [
        body('idUser').isInt(),
        body('newRoleId').isInt(),
        checkActionRole(['auth-token']),
    ],
    putChangeRoleUser,
)

router.post('/logut/', [checkActionRole(['auth-token'])], logut)

export default router
