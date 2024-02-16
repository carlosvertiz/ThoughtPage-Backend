import {validateTought, validatePartialTought} from '../schemas/thoughts.js'

export class ThoughtController {
  constructor({ thoughtModel }) {
    this.thoughtModel = thoughtModel
  }

  create = async (req, res) => {
    const result = validateTought(req.body)
    if (!result.success){
      return res.status(400).json({error: JSON.parse(result.error.message)})
    }
    const newThought = await  this.thoughtModel.create({input: result.data})
    return res.status(201).json({messaje: "Thought added"})
  }

  delete = async(req, res) => {
    const {id} = req.params

    const result = await this.thoughtModel.delete({id})

    if (result === false) {
      return res.status(404).jason({message: 'Thought not found'})
    }
    return res.json({messaje: 'Thought deleted'})
  }

  getAll = async(req, res) => {
    const num = req.query.num
    const categories = req.query.categories
    const views =  req.query.views
    const quantity = req.query.quantity
    const page = req.query.page
    const thoughts = await  this.thoughtModel.getAll({categories, num, views, quantity, page, res})

    return res.json(thoughts)
  }

  update = async(req, res) => {
    const result = validatePartialTought(req.body)
    if (!result.success){
      return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const id = req.params.id;
    const input = {
      thought: req.body.thought,
      categories: req.body.categories,
      views: req.body.views
    }

    const updatedThought = await  this.thoughtModel.update({id, input})

    return res.status(201).json({messaje: "Thought edited"})

  }


}