import createTable from '../migrations/createTable'
import createFerstUser from './create-ferst-user'
import { QueryResult } from 'pg'

const connectionCheckPg = async (err: Error, res: QueryResult<any>) => {
    if (err) {
        console.error('Error connecting to the database', err.stack)
        await connectionCheckPg(err, res)
        return
    }
    await createTable()
    await createFerstUser()
    console.log('Connected to the database:', res.rows)
}

export default connectionCheckPg
