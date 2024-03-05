import { createThoughtRouter } from "./routes/api.js"
import express, {json} from "express"

import {PORT} from './config.js'

export const createApp = ({thoughtModel}) => {
  
  const app = express()
  app.use(json())
  app.disable("x-powered-by")

  app.use('/thoughts', createThoughtRouter({ thoughtModel }) )

  

  const server = app.listen(PORT);
};

