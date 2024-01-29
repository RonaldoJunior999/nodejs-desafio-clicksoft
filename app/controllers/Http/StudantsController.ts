import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Allotment from 'App/models/Allotmet'
import Students from 'App/models/Students'
import StudantValidator from 'App/validator/StudantValidator'

export default class StudantsController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const body = await request.validate({ schema: StudantValidator })

      const studentEmailExist = await Students.findBy('email', body.email)
      const studentRegistrationExist = await Students.findBy('number_registration', body.number_registration)

      if (studentEmailExist || studentRegistrationExist) {
        return response.status(409).send({ message: "Student Already Exists!" })
      }

      const studant = await Students.create(body)

      return response.status(201).send({
        message: "Studant created",
        data: studant.serialize(),
      })
    } catch (error) {
      console.error(error);
      if (error.messages) {
        return response.status(422).send({
          message: "Validation failed",
          errors: error.messages,
        })
      }

      // Tratar outros erros
      return response.status(500).send({ message: "Erro de servidor interno" })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const studant = await Students.findBy('number_registration', params.id)

      if (!studant) {
        return response.status(404).send({ message: "Studant Not Found" })
      }

      return {
        data: studant
      }
    } catch (error) {
      // Tratar outros erros
      return response.status(500).send({ message: "Erro de servidor interno" })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const studant = await Students.findBy('number_registration', params.id)

      if (!studant) {
        return response.status(404).send({ message: "Professor Not Found" })
      }

      await studant.delete()

      return {
        message: "Studant deleted successfully",
        data: studant,
      }
    } catch (error) {
      // Tratar outros erros
      return response.status(500).send({ message: "Erro de servidor interno" })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const body = await request.validate({ schema: StudantValidator })
      const studant = await Students.findBy('number_registration', params.id)

      if (!studant) {
        return response.status(404).send({ message: "Student Not Found" })
      }

      studant.name = body.name
      studant.email = body.email
      studant.number_registration = body.number_registration
      studant.birth_date = body.birth_date

      await studant.save()

      return {
        message: "Updated",
        data: studant.serialize(),
      }
    } catch (error) {
      if (error.messages) {
        return response.status(422).send({
          message: "Validation failed",
          errors: error.messages,
        })
      }

      // Tratar outros erros
      return response.status(500).send({ message: "Erro de servidor interno" })
    }
  }
  public async showAllotment({ params, response }: HttpContextContract) {
    const studentRegistration = params.registration;
    const student = await Students.findBy('number_registration', studentRegistration)
    if (!student) {
        response.status(404);
        return {
          message: 'student not found',
        };
      }

    const allotment = await Allotment.query()
      .where('student_id', student.id)
      .preload('classroom')
      .preload('professor');

    if (allotment.length === 0) {
      response.status(404);
      return {
        message: 'No allotments found for this student',
      };
    }

    return {
        student_name: student.name,
        allotment: allotment.map((allotment) => ({
        professor: allotment.professor.name,
        number_classroom: allotment.classroom.number_classroom,
        })),
    };
}
}



