import Classroom from 'App/Models/Classroom'
import Professor from 'App/Models/Professor'
import ClassroomValidator from 'App/Validators/ClassroomValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClassroomService {
  /**
   * Cria uma nova sala vinculada ao professor
   */
  public static async createClassroom(ctx: HttpContextContract) {
    const { request, params, response } = ctx
    const payload = await request.validate(ClassroomValidator)

    const registration = params.registration
    const professor = await Professor.findBy('numer_registration', registration)

    if (!professor) {
      return response.status(404).send({ message: 'Professor not found' })
    }

    const existingRoom = await Classroom.query()
      .where('number_classroom', payload.number_classroom)
      .where('professor_id', professor.id)
      .first()

    if (existingRoom) {
      return response.status(409).send({ message: 'Register professor already exists' })
    }

    const classroom = await Classroom.create({
      ...payload,
      professor_id: professor.id,
    })

    return response.status(201).send({
      message: 'Room created',
      data: classroom,
    })
  }

  /**
   * Mostra uma sala específica
   */
  public static async showClassroom(ctx: HttpContextContract) {
    const { params, response } = ctx
    const { registration, classroomNumber } = params

    const professor = await Professor.findBy('numer_registration', registration)
    const classroom = await Classroom.findBy('number_classroom', classroomNumber)

    if (!classroom) {
      return response.status(404).send({ message: 'Classroom not found' })
    }

    if (!professor) {
      return response.status(404).send({ message: 'Professor not found' })
    }

    if (professor.id !== classroom.professor_id) {
      return response.status(401).send({ message: 'Unauthorized access' })
    }

    return { data: classroom }
  }

  /**
   * Atualiza os dados de uma sala
   */
  public static async updateClassroom(ctx: HttpContextContract) {
    const { request, params, response } = ctx
    const payload = await request.validate(ClassroomValidator)

    const { registration, classroomNumber } = params

    const professor = await Professor.findBy('numer_registration', registration)
    const classroom = await Classroom.findBy('number_classroom', classroomNumber)

    if (!professor) {
      return response.status(404).send({ message: 'Professor not found' })
    }

    if (!classroom) {
      return response.status(404).send({ message: 'Classroom not found' })
    }

    if (professor.id !== classroom.professor_id) {
      return response.status(401).send({ message: 'Unauthorized access' })
    }

    classroom.merge(payload)
    await classroom.save()

    return {
      message: 'Updated',
      data: classroom,
    }
  }

  /**
   * Deleta uma sala
   */
  public static async deleteClassroom(ctx: HttpContextContract) {
    const { params, response } = ctx
    const { registration, classroomNumber } = params

    const professor = await Professor.findBy('numer_registration', registration)
    const classroom = await Classroom.findBy('number_classroom', classroomNumber)

    if (!professor) {
      return response.status(404).send({ message: 'Professor not found' })
    }

    if (!classroom) {
      return response.status(404).send({ message: 'Classroom not found' })
    }

    if (professor.id !== classroom.professor_id) {
      return response.status(401).send({ message: 'You are not registered in this classroom' })
    }

    await classroom.delete()

    return {
      message: 'Classroom deleted successfully',
      data: classroom,
    }
  }
}
