import { DateTime } from 'luxon'
import Students from 'App/Models/Students'
import Allotment from 'App/Models/Allotmet'

export interface StudentData {
  name: string
  email: string
  number_registration: string
  birth_date: DateTime
}

export default class StudentService {
  public async registerStudent(data: StudentData) {
    const studentEmailExist = await Students.findBy('email', data.email)
    const studentRegistrationExist = await Students.findBy('number_registration', data.number_registration)

    if (studentEmailExist || studentRegistrationExist) {
      throw new Error('Student already exists')
    }

    return await Students.create(data)
  }

  public async getStudent(registration: string) {
    return await Students.findBy('number_registration', registration)
  }

  public async updateStudent(registration: string, data: StudentData) {
    const student = await Students.findBy('number_registration', registration)

    if (!student) return null

    student.merge(data)
    await student.save()

    return student
  }

  public async deleteStudent(registration: string) {
    const student = await Students.findBy('number_registration', registration)

    if (!student) return false

    await student.delete()
    return true
  }

  public async getStudentAllotment(registration: string) {
    const student = await Students.findBy('number_registration', registration)
    if (!student) return null

    const allotment = await Allotment.query()
      .where('student_id', student.id)
      .preload('classroom')
      .preload('professor')

    if (allotment.length === 0) return null

    return {
      student_name: student.name,
      allotment: allotment.map((a) => ({
        professor: a.professor.name,
        number_classroom: a.classroom.number_classroom,
      })),
    }
  }
}



// app/Services/StudentService.ts
/*import Students from 'App/Models/Students'
import { DateTime } from 'luxon'

export interface StudentData {
  name: string
  email: string
  number_registration: string
  birth_date: string | Date | DateTime
  password: string
}

export default class StudentService {
  public async registerStudent(data: StudentData) {
    const { name, email, number_registration, birth_date, password } = data

    // Verifica se email já existe
    const existingEmail = await Students.findBy('email', email)
    if (existingEmail) throw new Error('Email já cadastrado')

    // Verifica se número de registro já existe
    const existingRegistration = await Students.findBy('number_registration', number_registration)
    if (existingRegistration) throw new Error('Número de registro já cadastrado')

    // Cria o estudante
    const student = await Students.create({
      name,
      email,
      number_registration,
      birth_date: birth_date instanceof DateTime
        ? birth_date
        : DateTime.fromJSDate(new Date(birth_date)), // garante DateTime
      password, // será hasheado automaticamente pelo model
    })

    return student
  }
}*/
