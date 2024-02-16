import z from "zod"

const thoughtSchema = z.object({
  thought: z.string({
    required_error: "Tought is required."
  }),
  categories: z.string(),
})


export function validateTought (input) {
  return thoughtSchema.safeParse(input)
}

export function validatePartialTought (input) {
  return thoughtSchema.partial().safeParse(input)
}