import mysql from 'mysql2/promise'
import { DEFAULT_CONFIG } from './mysqlConfig.js'

const connectionString =  DEFAULT_CONFIG
console.log(DEFAULT_CONFIG)
console.log(DEFAULT_CONFIG.DB_HOST)
const connection = await mysql.createConnection(connectionString)

export class ToughtModel {

  static async getAll ({ categories, num, views, quantity, page, res }) {
    views =  views === undefined || views === null || views == "" ? 1 : views;

    if (categories) {
      if (page){
        const offset = (page - 1) * quantity
        const [paginationFiler] = await connection.query(
          'SELECT * FROM  thoughts WHERE categories LIKE ? AND views = ? ORDER BY id DESC limit ? offset ?',
          [`%${categories}%`, views, parseInt(quantity), parseInt(offset)]
        )

        const [totalCountRows] = await connection.query(
          'SELECT COUNT(*) AS total FROM thoughts WHERE categories LIKE ? AND views = ?',
          [`%${categories}%`, views]
        );
        const totalCount = totalCountRows[0].total;
        const totalPages = Math.ceil(totalCount / quantity);
        return {data:paginationFiler, totalPages}
      }
      const [thoughtsFiltered] = await connection.query(
        'SELECT * FROM  thoughts WHERE categories LIKE ? AND views = ? ORDER BY id DESC;',
        [`%${categories}%`, views]
      )
      if (categories.length === 0) return []

      return {data:thoughtsFiltered}
    }
    if (num) {
      const [fiveLastToughts] = await connection.query(
        `SELECT * FROM thoughts where views = ? ORDER BY id DESC
        LIMIT ?;`,[views, parseInt(num)]
      )
      if (fiveLastToughts.length === 0) return []
      return {data: fiveLastToughts}
    }

    if (page){
      const offset = (page - 1) * quantity
      const [pagination] = await connection.query(
        'SELECT * FROM  thoughts WHERE views = ? ORDER BY id DESC LIMIT ? OFFSET ?;',
        [views, parseInt(quantity), parseInt(offset)]
      )
      const [totalCountRows] = await connection.query(
        'SELECT COUNT(*) AS total FROM thoughts WHERE views = ?',
        [views]
      );
      const totalCount = totalCountRows[0].total;
      const totalPages = Math.ceil(totalCount / quantity);
     return {data: pagination, totalPages}
    }

    const [movies] = await connection.query(
      `SELECT * FROM thoughts where views = ? ORDER BY id DESC;`, [views]
    )
    return {data: movies}
  }


  static async create ({ input }) {
    const {
      thought,
      categories,
    } = input

    try {
      await connection.query(
        `INSERT INTO thoughts (thought, categories)
          VALUES ( ?, ?);`,
        [thought, categories]
      )
      return console.log("Thought added")
    } catch (e) {
      throw new Error('Error creating Thought')

    }
  }

  static async delete ({ id }) {
    try{      
      await connection.query(
        `Delete FROM thoughts 
          where id =  (?);`,
        [id]
    )
    return console.log("Thought deleted")
   } catch (e) {
    throw new Error('Error deleting Thought')  
   }
  } 

  static async update ({ id, input }) {
    const {thought, categories, views} = input
    try{
      if(views == 0 | views == 1) {
        await connection.query(
          `UPDATE thoughts
          set views = ?
          where id =  ?`,[views, id],
        )
        return console.log("Thought archived/desarchived")
      } 
      if(categories){
        await connection.query(
          'UPDATE thoughts set categories = ? where id =  ?;',[categories, id],
        )
      }
      if(thought){
        await connection.query(
          `UPDATE thoughts
          set thought = ?
          where id =  ?`,[thought, id],
        )
      }
      return console.log("Thought edited")
    } catch(e) {
      throw new Error('Error editing Thought')  
    }
  }
}