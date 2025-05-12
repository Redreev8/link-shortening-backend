import { Router } from 'express'
import { body, param } from 'express-validator'
import {
    deleteLinks,
    getLink,
    getLinks,
    patchLinks,
    postLinks,
} from './links.contoller'
import checkActionRole from '../../middleware/check-action-role'

const router = Router()

const queryCustomUrl = param('customUrl')
    .isString()
    .isLength({ min: 2, max: 50 })
const bodyDescription = body('description').isString()
const bodyUrl = body('url').isURL()
const bodyCustomUrl = body('customUrl').isString().isLength({ min: 2, max: 50 })
const bodyNewCustomUrl = body('newCustomUrl')
    .isString()
    .isLength({ min: 2, max: 50 })

router.get('/links/', [checkActionRole(['auth-token', 'token'])], getLinks)

router.get(
    '/links/:customUrl',
    [queryCustomUrl, checkActionRole(['auth-token', 'token'])],
    getLink,
)

router.post(
    '/links/',
    [
        checkActionRole(['auth-token', 'token']),
        bodyDescription,
        bodyUrl,
        bodyCustomUrl,
    ],
    postLinks,
)

router.put(
    '/links/:customUrl',
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
    '/links/:customUrl',
    [queryCustomUrl, checkActionRole(['auth-token', 'token'])],
    deleteLinks,
)

export default router
