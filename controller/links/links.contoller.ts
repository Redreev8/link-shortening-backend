import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import {
    changeLink,
    createLinks,
    findLinks,
    findLink,
    removeLink,
} from './links.model'
import getTokenToUserData from './helper/get-token-to-user-data'

export const redirect = async (
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
        const { idUser, customUrl } = req.params
        const link = await findLink(customUrl, +idUser)
        if (!link) {
            res.status(404).json({})
            return
        }
        res.writeHead(302, {
            Location: link.url,
        })
        res.end()
        return
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что пошло не так', erors: e })
    }
}

export const getLinks = async (
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
        const user = await getTokenToUserData(req, res)
        if (!user) return
        const Links = await findLinks(user.id)
        res.json(Links)
        return
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что пошло не так', erors: e })
    }
}
export const getLink = async (
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
        const { customUrl } = req.params
        const user = await getTokenToUserData(req, res)
        if (!user) return
        const link = await findLink(customUrl, user.id)
        if (!link) {
            res.status(404).json({})
            return
        }
        res.json(link)
        return
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что пошло не так', erors: e })
    }
}
export const postLinks = async (
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
        const { description, url, customUrl } = req.body
        const user = await getTokenToUserData(req, res)
        if (!user) return
        const link = await createLinks({
            description,
            url,
            customUrl,
            user_id: user.id,
        })
        res.json(link)
        return
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что пошло не так', erors: e })
    }
}
export const patchLinks = async (
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
        const { customUrl } = req.params
        const { description, url, newCustomUrl } = req.body
        const user = await getTokenToUserData(req, res)
        if (!user) return
        const link = await changeLink({
            user_id: user.id,
            customUrl,
            description,
            url,
            newCustomUrl,
        })
        if (!link) {
            res.status(404).json({})
            return
        }
        res.json(link)
        return
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что пошло не так', erors: e })
    }
}
export const deleteLinks = async (
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
        const { customUrl } = req.params
        const user = await getTokenToUserData(req, res)
        if (!user) return
        const link = await removeLink(customUrl, user.id)
        if (!link) {
            res.status(404).json({})
            return
        }
        res.json(link)
        return
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что пошло не так', erors: e })
    }
}
