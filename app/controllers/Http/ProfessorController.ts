import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professor from 'App/models/Professor'
import ProfessorValidator from 'App/validator/ProfessorValidator'

export default class ProfessorController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const body = await request.validate({ schema: ProfessorValidator })

      const studentEmailExist = await Professor.findBy('email', body.email)
      const studentRegistrationExist = await Professor.findBy('number_registration', body.number_registration)

      if (studentEmailExist || studentRegistrationExist) {
        return response.status(409).send({ message: "Professor already exists!" })
      }

      const professor = await Professor.create(body)

      return response.status(201).send({
        message: "Professor created",
        data: professor
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
      const professor = await Professor.findBy('number_registration', params.id)

      if (!professor) {
        return response.status(404).send({ message: "Not found professor!" })
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
      const professor = await Professor.findBy('number_registration', params.id)

      if (!professor) {
        return response.status(404).send({ message: "Not found professor!" })
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
      const professor = await Professor.findBy('number_registration', params.id)

      if (!professor) {
        return response.status(404).send({ message: "Not found professor!" })
      }

      professor.name = body.name
      professor.email = body.email
      professor.number_registration = body.number_registration
      professor.birth_date = body.birth_date

      await professor.save()

      return {
        message: "Updated",
        data: professor,
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
