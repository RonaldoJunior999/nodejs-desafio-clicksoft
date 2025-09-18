import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default schema.create({
  registration_professor: schema.string(),
  number_classroom: schema.string(),
  email_student: schema.string({}, [
    rules.email(),
  ]),
  registration: schema.string(),
  idStudent: schema.number(),
  classroom: schema.string(),
});