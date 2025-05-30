import { Request, Response } from 'express'
import { changeRoleUser, createUsers, findUser, User } from './users.model'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {
    createToken,
    findPayloadToken,
    findTokensValue,
    removeToken,
} from '../token/token.model'
import { getPayloadUser } from './user.dto'
import { DatabaseError } from 'pg'
import errorsRequest from '../../helper/errors-request'

export const getUserData = async (
    req: Request,
    res: Response,
): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Имя или пороль не валидны',
                ...errors,
                body: req.body,
            })
            return
        }
        const token = req.get('auth-token')
        const payload = (await findPayloadToken(token!)) as User
        res.json({ name: payload.name, id: payload.id })
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

export const register = async (
    req: Request,
    res: Response,
): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Имя или пороль не валидны',
                ...errors,
                body: req.body,
            })
            return
        }
        const { name, password } = req.body
        const userCheck = await findUser(name)

        if (userCheck) {
            res.status(400).json('Имя занято')
            return
        }
        const salt = await bcrypt.genSalt(10)
        const hasPassword = await bcrypt.hash(password, salt)
        const user = await createUsers(name, hasPassword)
        const token = await createToken(getPayloadUser(user), user.id)
        res.json(token)
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

export const login = async (
    req: Request,
    res: Response,
): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Имя или пороль не валидны',
                ...errors,
                body: req.body,
            })
            return
        }
        const { name, password } = req.body
        const user = await findUser(name)

        if (!user) {
            res.status(401).json('Имя или пороль не верны')
            return
        }

        const validPass = await bcrypt.compare(password, user.password)
        if (!validPass) {
            res.status(401).json('Имя или пороль не верны')
            return
        }
        const token = await createToken(getPayloadUser(user), user.id)
        res.json(token)
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

export const putChangeRoleUser = async (
    req: Request,
    res: Response,
): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Имя или пороль не валидны',
                ...errors,
                body: req.body,
            })
            return
        }
        const { idUser, newRoleId } = req.body
        await changeRoleUser(idUser, newRoleId)
        const tokens = await findTokensValue(idUser)
        tokens.forEach((token) => removeToken(token))
        res.json(newRoleId)
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

export const logut = async (
    req: Request,
    res: Response,
): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Не передан токен',
                ...errors,
            })
            return
        }
        const token = req.get('auth-token')
        const user = jwt.decode(token!)
        if (!user) {
            res.status(400).json({
                message: 'Не неверный токен',
                ...errors,
            })
            return
        }
        await removeToken(token!)
        res.json()
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
