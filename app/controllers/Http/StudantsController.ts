import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Students from 'App/models/Students'
import StudantValidator from 'App/validator/StudantValidator'

export default class StudantsController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const body = await request.validate({ schema: StudantValidator })

      const studentEmailExist = await Students.findBy('email', body.email)
      const studentRegistrationExist = await Students.findBy('number_registration', body.number_registration)

      if (studentEmailExist || studentRegistrationExist) {
        return response.status(409).send({ message: "Studant already exists!" })
      }

      const studant = await Students.create(body)

      return response.status(201).send({
        message: "Studant created",
        data: studant
      })
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

  public async show({ params, response }: HttpContextContract) {
    try {
      const studant = await Students.findBy('number_registration', params.id)

      if (!studant) {
        return response.status(404).send({ message: "Not found studant!" })
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
        return response.status(404).send({ message: "Not found professor!" })
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
        return response.status(404).send({ message: "Not found Studant!" })
      }

      studant.name = body.name
      studant.email = body.email
      studant.number_registration = body.number_registration
      studant.birth_date = body.birth_date

      await studant.save()

      return {
        message: "Updated",
        data: studant,
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
}
