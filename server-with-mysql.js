import {createApp} from './start.js'
import {ToughtModel} from './models/mysql/thoughs.js'
import { createTable } from './models/mysql/createTable.js'

createTable()
createApp({thoughtModel:ToughtModel})