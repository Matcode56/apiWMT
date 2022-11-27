import dotenv from 'dotenv'
import { Client, Pool } from 'pg'

class PostgreSQLService {
  constructor() {
    this.connectToPostgreDB()
  }

  connectToPostgreDB = async () => {
    try {
      const pool = new Pool({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: 5432,
      })
      await pool.connect()
    } catch (err) {
      console.log(err)
    }
  }
}
export default new PostgreSQLService()
