import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import professors from 'App/models/Professor'
import ProfessorValidator from 'App/validator/ProfessorValidator'

export default class ProfessorController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const body = await request.validate({ schema: ProfessorValidator })

      const professorEmailExist = await professors.findBy('email', body.email)
      const professorRegistrationExist = await professors.findBy('numer_registration', body.numer_registration)

      if (professorEmailExist || professorRegistrationExist) {
        return response.status(409).send({ message: "Professor already exists!" })
      }

      const professor = await professors.create(body)

      return response.status(201).send({
        message: "Professor created",
        data: professor.serialize(),
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
      return response.status(500).send({ message: "Internal Server Error" })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const professor = await professors.findBy('numer_registration', params.id)

      if (!professor) {
        return response.status(404).send({ message: "Professor Not Found!" })
      }

      return {
        data: professor
      }
    } catch (error) {
      // Tratar outros erros
      return response.status(500).send({ message: "Internal Server Error" })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const professor = await professors.findBy('numer_registration', params.id)

      if (!professor) {
        return response.status(404).send({ message: "Professor Not Found!" })
      }

      await professor.delete()

      return {
        message: "Professor deleted successfully",
        data: professor,
      }
    } catch (error) {
      // Tratar outros erros
      return response.status(500).send({ message: "Internal Server Error" })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const body = await request.validate({ schema: ProfessorValidator })
      const professor = await professors.findBy('numer_registration', params.id)

      if (!professor) {
        return response.status(404).send({ message: "Professor Not found" })
      }

      professor.name = body.name
      professor.email = body.email
      professor.numer_registration = body.numer_registration
      professor.birth_date = body.birth_date

      await professor.save()

      return {
        message: "Date Updated",
        data: professor.serialize,
      }
    } catch (error) {
      if (error.messages) {
        return response.status(422).send({
          message: "Validation failed",
          errors: error.messages,
        })
      }

      // Tratar outros erros
      return response.status(500).send({ message: "Internal Server Error" })
    }
  }
}
