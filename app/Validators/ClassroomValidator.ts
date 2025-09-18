import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ClassroomValidator {
  public schema = schema.create({
    number_classroom: schema.string({}, [
      rules.maxLength(50), // limite opcional para evitar string gigante
    ]),
    capacity: schema.number(),
    avaliation: schema.boolean(),
  })
}



/*import { schema } from '@ioc:Adonis/Core/Validator'

export default schema.create({
  number_classroom: schema.string(),
  capacity: schema.number(),
  avaliation: schema.boolean(),
})*/