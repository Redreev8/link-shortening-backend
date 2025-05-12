import { Router } from 'express'
import { body, param } from 'express-validator'
import {
    deleteLinks,
    getLink,
    getLinks,
    patchLinks,
    postLinks,
    redirect,
} from './links.contoller'
import checkActionRole from '../../middleware/check-action-role'

const router = Router()

const queryIdUser = param('idUser').isInt({ min: 1 })
const queryCustomUrl = param('customUrl')
    .isString()
    .isLength({ min: 2, max: 50 })
const bodyDescription = body('description').isString()
const bodyUrl = body('url').isURL()
const bodyCustomUrl = body('customUrl').isString().isLength({ min: 2, max: 50 })
const bodyNewCustomUrl = body('newCustomUrl')
    .isString()
    .isLength({ min: 2, max: 50 })

router.get('/l/:idUser/:customUrl', [queryIdUser, queryCustomUrl], redirect)

router.get('/api/links/', [checkActionRole(['auth-token', 'token'])], getLinks)

router.get(
    '/api/links/:customUrl',
    [queryCustomUrl, checkActionRole(['auth-token', 'token'])],
    getLink,
)

router.post(
    '/api/links/',
    [
        checkActionRole(['auth-token', 'token']),
        bodyDescription,
        bodyUrl,
        bodyCustomUrl,
    ],
    postLinks,
)

router.put(
    '/api/links/:customUrl',
    [
        queryCustomUrl,
        bodyDescription,
        bodyUrl,
        bodyNewCustomUrl,
        checkActionRole(['auth-token', 'token']),
    ],
    patchLinks,
)

router.delete(
    '/api/links/:customUrl',
    [queryCustomUrl, checkActionRole(['auth-token', 'token'])],
    deleteLinks,
)

export default router
