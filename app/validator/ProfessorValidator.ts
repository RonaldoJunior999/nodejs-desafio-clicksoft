// validators/ProfessorValidator.ts

import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default schema.create({
  name: schema.string(),
  email: schema.string({}, [
    rules.email(),
  ]),
  numer_registration: schema.string(),
  birth_date: schema.date(),
}) 


/*import { schema, rules, ParsedTypedSchema } from '@ioc:Adonis/Core/Validator'

export const ProfessorValidator: ParsedTypedSchema<typeof schema> = {
    _name: schema.string(),
    get name() {
        return this._name
    },
    set name(value) {
        this._name = value
    },
  email: schema.string({}, [rules.email()]),
  registration_number: schema.string(),
  date_of_birth: schema.date(),
}*/