import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import {
    findActions,
    findAction,
    removeAction,
    createAction,
    changeAction,
} from './actons.model'
import { DatabaseError } from 'pg'
import errorsRequest from '../../helper/errors-request'

export const getActions = async (
    req: Request,
    res: Response,
): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Не валидные даные',
                ...errors,
            })
            return
        }
        const result = await findActions()
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
export const getAction = async (
    req: Request,
    res: Response,
): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Не валидные даные',
                ...errors,
            })
            return
        }
        const { id } = req.params
        const result = await findAction(id)
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
export const postAction = async (
    req: Request,
    res: Response,
): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Не валидные даные',
                ...errors,
            })
            return
        }
        const { action } = req.body
        const result = await createAction(action)
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
export const patchAction = async (
    req: Request,
    res: Response,
): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Не валидные даные',
                ...errors,
            })
            return
        }
        const { id } = req.params
        const { action } = req.body
        const result = await changeAction(id, action)
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
export const deleteAction = async (
    req: Request,
    res: Response,
): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Не валидные даные',
                ...errors,
            })
            return
        }
        const { id } = req.params
        const result = await removeAction(id)
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
