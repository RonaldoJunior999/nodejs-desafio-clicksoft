import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Allotment from 'App/Models/Allotmet'
import Professors from 'App/Models/Professor'
import Classroom from 'App/Models/Classroom'
import Students from 'App/Models/Students'

export default class AllotmentService {
  public static async createAllotment({ request, response }: HttpContextContract) {
    try {
      const body = request.body()

      const professor = await Professors.findBy('numer_registration', body.registration_professor)
      const classroom = await Classroom.findBy('number_classroom', body.number_classroom)
      const student = await Students.findBy('email', body.email_student)

      if (!professor) return response.status(404).send({ message: 'Professor not found' })
      if (!classroom) return response.status(404).send({ message: 'Classroom not found' })
      if (!student) return response.status(404).send({ message: 'Student not found' })

      if (classroom.avaliation === false) {
        return response
          .status(401)
          .send({ message: "it's impossible to relocate students in this classroom" })
      }

      const totalAllotments = await Allotment.query()
        .where('classroom_id', classroom.id)
        .count('id as count')

      const totalStudents = totalAllotments[0].$extras.count
      if (totalStudents >= classroom.capacity) {
        return response.status(409).send({ message: 'Classroom capacity exceeded' })
      }

      const existingAllotment = await Allotment.query()
        .where('student_id', student.id)
        .where('classroom_id', classroom.id)
        .first()

      if (classroom.professor_id !== professor.id) {
        return response
          .status(401)
          .send({ message: 'The teacher is not responsible for this classroom' })
      }

      if (existingAllotment) {
        return response
          .status(409)
          .send({ message: 'Student already exists in this classroom' })
      }

      const allotment = await Allotment.create({
        professor_id: professor.id,
        classroom_id: classroom.id,
        student_id: student.id,
      })

      return response.status(201).send({
        message: 'Allotment created',
        data: allotment,
      })
    } catch (error) {
      console.error(error)
      return response.status(500).send({ message: 'Internal Server Error' })
    }
  }

  public static async deleteAllotment({ params, response }: HttpContextContract) {
    try {
      const classroom = await Classroom.findBy('number_classroom', params.classroom)
      const professor = await Professors.findBy('numer_registration', params.registration)

      if (!professor) return response.status(404).send({ message: 'Professor not found' })
      if (!classroom) return response.status(404).send({ message: 'Classroom not found' })

      const studentAllotment = await Allotment.query()
        .where('student_id', params.idStudent)
        .where('classroom_id', classroom.id)
        .first()

      if (!studentAllotment) {
        return response.status(404).send({
          message: 'Student not found in this classroom',
        })
      }

      await studentAllotment.delete()

      return response.status(200).send({
        message: 'Student deleted successfully',
        data: studentAllotment,
      })
    } catch (error) {
      console.error(error)
      return response.status(500).send({ message: 'Internal Server Error' })
    }
  }

  public static async listAllotments({ params, response }: HttpContextContract) {
    try {
      const classroom = await Classroom.findBy('number_classroom', params.classroom)
      const professor = await Professors.findBy('numer_registration', params.registration)

      if (!professor) return response.status(404).send({ message: 'Professor not found' })
      if (!classroom || classroom.professor_id !== professor.id) {
        return response.status(404).send({ message: 'Classroom not found' })
      }

      const allotments = await Allotment.query()
        .where('classroom_id', classroom.id)
        .where('professor_id', professor.id)
        .preload('students')

      const students = allotments.map((a) => a.students)

      return response.status(200).send({
        message: 'Return successful',
        data: students,
      })
    } catch (error) {
      console.error(error)
      return response.status(500).send({ message: 'Internal Server Error' })
    }
  }
}



/*import Allotment from 'App/Models/Allotmet'
import Professors from 'App/Models/Professor'
import Classroom from 'App/Models/Classroom'
import Students from 'App/Models/Students'
import AllotmentValidator from 'App/Validators/AllotmentValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AllotmentService {
  /**
   * Cria uma alocação (professor + sala + estudante)
   */
  /*public static async createAllotment(ctx: HttpContextContract) {
    const { request, response } = ctx
    const body = await request.validate({ schema: AllotmentValidator })

    const professor = await Professors.findBy('numer_registration', body.registration_professor)
    const classroom = await Classroom.findBy('number_classroom', body.number_classroom)
    const student = await Students.findBy('email', body.email_student)

    if (!professor) {
      return response.status(404).send({ message: 'Professor not found' })
    }
    if (!classroom) {
      return response.status(404).send({ message: 'Classroom not found' })
    }
    if (!student) {
      return response.status(404).send({ message: 'Student not found' })
    }

    if (classroom.avaliation === false) {
      return response.status(401).send({ message: 'It is impossible to allocate students in this classroom' })
    }

    // Verifica se já atingiu a capacidade
    const totalAllotments = await Allotment.query().where('classroom_id', classroom.id).count('id as count')
    const totalStudentsInClassroom = totalAllotments[0].$extras.count
    if (totalStudentsInClassroom >= classroom.capacity) {
      return response.status(409).send({ message: 'Classroom capacity exceeded' })
    }

    // Verifica se aluno já está na turma
    const existingAllotment = await Allotment.query()
      .where('student_id', student.id)
      .where('classroom_id', classroom.id)
      .first()

    if (existingAllotment) {
      return response.status(409).send({ message: 'Student already exists in this classroom' })
    }

    if (classroom.professor_id !== professor.id) {
      return response.status(401).send({ message: 'The teacher is not responsible for this classroom' })
    }

    const newAllotment = await Allotment.create({
      professor_id: professor.id,
      classroom_id: classroom.id,
      student_id: student.id,
    })

    return response.status(201).send({
      message: 'Allotment created successfully',
      data: newAllotment,
    })
  }

  /**
   * Remove um estudante da sala
   */
  /*public static async deleteAllotment(ctx: HttpContextContract) {
    const { params, request, response } = ctx
    await request.validate({ schema: AllotmentValidator })

    const classroom = await Classroom.findBy('number_classroom', params.number_classroom)
    const professor = await Professors.findBy('numer_registration', params.registration)

    if (!professor) {
      return response.status(404).send({ message: 'Professor not found' })
    }
    if (!classroom) {
      return response.status(404).send({ message: 'Classroom not found' })
    }

    const studentAllotment = await Allotment.query()
      .where('student_id', params.idStudent)
      .where('classroom_id', classroom.id)
      .first()

    if (!studentAllotment) {
      return response.status(404).send({ message: 'Student not found in this classroom' })
    }

    await studentAllotment.delete()

    return response.status(200).send({
      message: 'Student removed successfully',
      data: studentAllotment,
    })
  }

  /**
   * Lista todos os alunos de uma sala
   */
  /*public static async listAllotments(ctx: HttpContextContract) {
    const { params, response } = ctx

    const classroom = await Classroom.findBy('number_classroom', params.classroom)
    const professor = await Professors.findBy('numer_registration', params.registration)

    if (!professor) {
      return response.status(404).send({ message: 'Professor not found' })
    }
    if (!classroom || classroom.professor_id !== professor.id) {
      return response.status(404).send({ message: 'Classroom not found or professor not responsible' })
    }

    const allotments = await Allotment.query()
      .where('classroom_id', classroom.id)
      .where('professor_id', professor.id)
      .preload('students')

    const students = allotments.map((allotment) => allotment.students)

    return response.status(200).send({
      message: 'Students retrieved successfully',
      data: students,
    })
  }
}*/
