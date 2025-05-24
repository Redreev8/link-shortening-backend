import { validationResult } from 'express-validator'
import { findToken, createToken, findPayloadToken } from './token.model'
import { Request, Response } from 'express'
import { User } from '../users/users.model'
import { DatabaseError } from 'pg'
import errorsRequest from '../../helper/errors-request'

export const getCheckToken = async (
    req: Request,
    res: Response,
): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ message: 'Не передан токен', ...errors })
            return
        }
        const token = req.get('token')
        const result = await findToken(token!)
        const isTokenValid = typeof result === 'string'
        res.status(isTokenValid ? 200 : 404).json(isTokenValid)
        return
    } catch (e) {
        const error = e as DatabaseError
        console.error(error)
        if (!error?.code || !errorsRequest[error.code]) {
            errorsRequest.default(res, error)
            return
        }
        errorsRequest[error.code](res, error)
    }
}

export const getPayloadToken = async (
    req: Request,
    res: Response,
): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ message: 'Не передан токен', ...errors })
            return
        }
        const token = req.get('token')
        const result = await findPayloadToken(token!)
        if (!result) {
            res.status(404).json({})
            return
        }
        res.json(result)
        return
    } catch (e) {
        const error = e as DatabaseError
        console.error(error)
        if (!error?.code || !errorsRequest[error.code]) {
            errorsRequest.default(res, error)
            return
        }
        errorsRequest[error.code](res, error)
    }
}

export const postCreateToken = async (
    req: Request,
    res: Response,
): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ message: 'Не передан токен', ...errors })
            return
        }
        const token = req.get('auth-token')
        const user = (await findPayloadToken(token!)) as User
        let payload = req.body.actions
        if (Array.isArray(payload)) {
            payload = payload.filter((el) => {
                if (typeof el !== 'string') return false
                if (user.actions && user.actions.includes('ALL')) return true
                return user.actions?.includes(el)
            })
        }
        const result = await createToken({ actions: payload })
        res.json(result)
        return
    } catch (e) {
        const error = e as DatabaseError
        console.error(error)
        if (!error?.code || !errorsRequest[error.code]) {
            errorsRequest.default(res, error)
            return
        }
        errorsRequest[error.code](res, error)
    }
}
