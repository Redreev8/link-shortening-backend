import { Response } from 'express'
import { DatabaseError } from 'pg'

const errorsRequest: {
    [key: string]: (res: Response, e: DatabaseError) => void
} = {
    '23505': (res: Response, e: DatabaseError) => {
        res.status(400).json({ message: 'duplicate key', errors: e })
    },
    default: (res: Response, e: unknown) => {
        res.status(500).json({ message: 'Что пошло не так', errors: e })
    },
}

export default errorsRequest
