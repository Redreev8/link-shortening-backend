import { Request, Response } from 'express'
import { findPayloadToken } from '../../token/token.model'
import { User } from '../../users/users.model'

const getTokenToUserData = async (req: Request, res: Response) => {
    const token = req.get('auth-token') ?? req.get('token')
    const user = (await findPayloadToken(token!)) as User
    if (!user.id) {
        res.status(400).json({
            message: 'Не валидный токен',
        })
        return
    }

    return user
}

export default getTokenToUserData
