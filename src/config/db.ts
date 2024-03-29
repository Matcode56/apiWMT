import { Pool } from 'pg'
import * as dotenv from 'dotenv'
require('dotenv').config({ path: __dirname + '/../.env' })

export const getPool = () => {
  const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT),
  })

  return pool
}
