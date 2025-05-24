import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { changeRoleActions } from './role-actions.model'
import { DatabaseError } from 'pg'
import errorsRequest from '../../helper/errors-request'

export const patchRoleActions = async (
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
        const { roleId } = req.params
        const { actions } = req.body
        const result = await changeRoleActions(roleId, actions)
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
