import pool from '../../config/prosgres'
import { sqlsKey } from '../../migrations/createTable'

export const nameTableLinks = sqlsKey.links

export interface Link {
    description: string
    url: string
    customUrl: string
    user_id: number
}

export const findLinks = async (idUser: number): Promise<Link[]> => {
    const result = await pool.query(
        `SELECT * FROM ${nameTableLinks} l WHERE user_id = $1`,
        [idUser],
    )
    return result.rows
}

export const findLink = async (
    customUrl: string,
    idUser: number,
): Promise<Link> => {
    const result = await pool.query(
        `SELECT * FROM ${nameTableLinks} 
        WHERE user_id=$1 AND customUrl = $2`,
        [idUser, customUrl],
    )
    return result.rows[0]
}

export const createLinks = async ({
    description,
    url,
    customUrl,
    user_id,
}: Omit<Link, 'id'>): Promise<Link> => {
    const result = await pool.query<Link>(
        `INSERT INTO ${nameTableLinks}(description, url, customUrl, user_id) 
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [description, url, customUrl, user_id],
    )
    return result.rows[0]
}

export const changeLink = async ({
    description,
    url,
    customUrl,
    newCustomUrl,
    user_id,
}: Link & { newCustomUrl: string }): Promise<Link> => {
    const result = await pool.query<Link>(
        `UPDATE ${nameTableLinks}
        SET description = $1, url = $2, customUrl = $4
        WHERE user_id = $5 AND customUrl = $3
        RETURNING *`,
        [description, url, customUrl, newCustomUrl, user_id],
    )
    return result.rows[0]
}

export const removeLink = async (
    customUrl: string,
    idUser: number,
): Promise<Link> => {
    const result = await pool.query<Link>(
        `DELETE FROM ${nameTableLinks} 
        WHERE customUrl = $1 AND user_id = $2 
        RETURNING *`,
        [customUrl, idUser],
    )
    return result.rows[0]
}
