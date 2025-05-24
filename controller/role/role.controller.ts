import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import {
    changeRole,
    createRole,
    finRole,
    finRoles,
    removeRole,
} from './role.model'
import { DatabaseError } from 'pg'
import errorsRequest from '../../helper/errors-request'

export const getRoles = async (
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
        const roles = await finRoles()
        res.json(roles)
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
export const getRole = async (
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
        const role = await finRole(id)
        if (!role) {
            res.status(404).json({})
            return
        }
        res.json(role)
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
export const postRole = async (
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
        const { name } = req.body
        const role = await createRole(name)
        res.json(role)
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
export const patchRole = async (
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
        const { name } = req.body
        const role = await changeRole(id, name)
        if (!role) {
            res.status(404).json({})
            return
        }
        res.json(role)
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
export const deleteRole = async (
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
        const role = await removeRole(id)
        if (!role) {
            res.status(404).json({})
            return
        }
        res.json(role)
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
