// app/Validators/StudantValidator.ts
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class StudantValidator {
  public schema = schema.create({
    name: schema.string(),
    email: schema.string({}, [rules.email()]),
    number_registration: schema.string(),
    birth_date: schema.date(),
    password: schema.string({}, [rules.minLength(6)]), // senha mínima 6 caracteres
  })
}


/*import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default schema.create({
  name: schema.string(),
  email: schema.string({}, [
    rules.email(),
  ]),
  number_registration: schema.string(),
  birth_date: schema.date(),
}) */