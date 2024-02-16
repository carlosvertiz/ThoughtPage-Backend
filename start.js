import { createThoughtRouter } from "./routes/api.js"
import express, {json} from "express"

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import {PORT} from './config.js'

export const createApp = ({thoughtModel}) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  
  const app = express()
  app.use(json())
  app.disable("x-powered-by")

  app.use('/thoughts', createThoughtRouter({ thoughtModel }) )

  

  const server = app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${server.address().port}`);
  });
};

