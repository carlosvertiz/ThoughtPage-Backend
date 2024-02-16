import { DEFAULT_CONFIG } from './mysqlConfig'
import mysql from 'mysql2/promise'


export async function  createTable() {
  const connection = await mysql.createConnection(connectionString)
  await connection.query( `CREATE TABLE IF NOT EXISTS thoughts(
    id INT NOT NULL AUTO_INCREMENT,
    thought TEXT NOT NULL,
    categories TEXT,
    views INT default(1),
    dates timestamp NOT NULL DEFAULT (NOW()), 
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id));`
  )
}