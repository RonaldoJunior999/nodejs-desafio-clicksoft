import { schema } from '@ioc:Adonis/Core/Validator'

export default schema.create({
  number_classroom: schema.string(),
  capacity: schema.number(),
  avaliation: schema.boolean(),
})