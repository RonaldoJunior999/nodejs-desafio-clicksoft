import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * Validator usado no POST (store)
 */
export class CreateAllotmentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    registration_professor: schema.string(),
    number_classroom: schema.string(),
    email_student: schema.string({}, [rules.email()]),
  })

  public messages = {
    'registration_professor.required': 'registration_professor is required',
    'number_classroom.required': 'number_classroom is required',
    'email_student.required': 'email_student is required',
    'email_student.email': 'email_student must be a valid email',
  }
}

/**
 * Validator usado no DELETE
 */
export class DeleteAllotmentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    registration: schema.string(),
    idStudent: schema.number(),
    classroom: schema.string(),
  })

  public messages = {
    'registration.required': 'registration is required',
    'idStudent.required': 'idStudent is required',
    'classroom.required': 'classroom is required',
  }
}

/**
 * Validator usado no GET (index)
 * Aqui validamos os PARAMS, não o body.
 */
export class ListAllotmentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    registration: schema.string(),
    classroom: schema.string(),
  })

  public messages = {
    'registration.required': 'registration is required',
    'classroom.required': 'classroom is required',
  }
}



/*import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default schema.create({
  registration_professor: schema.string(),
  number_classroom: schema.string(),
  email_student: schema.string({}, [
    rules.email(),
  ]),
  registration: schema.string(),
  idStudent: schema.number(),
  classroom: schema.string(),
});*/