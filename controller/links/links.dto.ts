import { LinkSql } from './links.model'

export interface Link {
    description: string
    url: string
    customUrl: string
}

const LinkDtoDefault = (l: LinkSql): Link => ({
    description: l.description,
    url: l.url,
    customUrl: l.customurl,
})

export default LinkDtoDefault
