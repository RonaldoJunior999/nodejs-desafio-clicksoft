import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default schema.create({
  name: schema.string(),
  email: schema.string({}, [
    rules.email(),
  ]),
  number_registration: schema.string(),
  birth_date: schema.date(),
}) 