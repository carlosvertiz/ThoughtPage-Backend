import {Router} from "express"
import {ThoughtController} from "../controllers/thoughtsControllers.js"
import cors from 'cors'


export const createThoughtRouter = ({thoughtModel}) => {



  const thoughtRouter = Router();
  const thoughtController = new ThoughtController({ thoughtModel })

  thoughtRouter.use(cors({
    origin: (origin, callback) => {
      console.log(origin)
      const ACCEPTED_ORIGINS = [
        'http://localhost:5173',
        'https://thoughtnotebook.netlify.app/'
      ]
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }
      if (!origin){
        return callback(null, true)
      }
      return callback(new Error('Not Allowed by CORS'))
    }

  })
  )

  thoughtRouter.get('/', thoughtController.getAll);
  thoughtRouter.post('/', thoughtController.create);


  thoughtRouter.patch('/:id', thoughtController.update);
  thoughtRouter.delete('/:id', thoughtController.delete);

  return thoughtRouter
}

