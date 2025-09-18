import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProfessorService, { ProfessorData } from 'App/Services/ProfessorService'
import ProfessorValidator from 'App/Validators/ProfessorValidator'
import { DateTime } from 'luxon'

export default class ProfessorController {
  private professorService = new ProfessorService()

  public async store({ request, response }: HttpContextContract) {
    try {
      const body = await request.validate(ProfessorValidator)

      const professorData: ProfessorData = {
        ...body,
        birth_date: body.birth_date instanceof DateTime
          ? body.birth_date
          : DateTime.fromJSDate(new Date(body.birth_date)),
      }

      const professor = await this.professorService.registerProfessor(professorData)

      return response.status(201).send({
        message: "Professor created successfully",
        data: professor.serialize(),
      })
    } catch (error: any) {
      if (error.messages) {
        return response.status(422).send({ message: "Validation failed", errors: error.messages })
      }
      if (error.message.includes("already exists")) {
        return response.status(409).send({ message: error.message })
      }
      return response.status(400).send({ message: error.message || "Erro ao criar professor" })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const professor = await this.professorService.getProfessor(params.id)

      if (!professor) {
        return response.status(404).send({ message: "Professor not found" })
      }

      return { data: professor }
    } catch (error: any) {
      return response.status(400).send({ message: error.message || "Erro ao buscar professor" })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const body = await request.validate(ProfessorValidator)

      const professorData: ProfessorData = {
        ...body,
        birth_date: body.birth_date instanceof DateTime
          ? body.birth_date
          : DateTime.fromJSDate(new Date(body.birth_date)),
      }

      const professor = await this.professorService.updateProfessor(params.id, professorData)

      if (!professor) {
        return response.status(404).send({ message: "Professor not found" })
      }

      return {
        message: "Professor updated successfully",
        data: professor.serialize(),
      }
    } catch (error: any) {
      if (error.messages) {
        return response.status(422).send({ message: "Validation failed", errors: error.messages })
      }
      return response.status(400).send({ message: error.message || "Erro ao atualizar professor" })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const deleted = await this.professorService.deleteProfessor(params.id)

      if (!deleted) {
        return response.status(404).send({ message: "Professor not found" })
      }

      return { message: "Professor deleted successfully" }
    } catch (error: any) {
      return response.status(400).send({ message: error.message || "Erro ao deletar professor" })
    }
  }
}




/*import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProfessorService, { ProfessorData } from 'App/Services/ProfessorService'
import ProfessorValidator from 'App/Validators/ProfessorValidator'
import { DateTime } from 'luxon'

export default class ProfessorController {
  private professorService = new ProfessorService()

  public async store({ request, response }: HttpContextContract) {
    try {
      const body = await request.validate(ProfessorValidator)

      const professorData: ProfessorData = {
        ...body,
        birth_date: body.birth_date instanceof DateTime
          ? body.birth_date
          : new Date(body.birth_date),
      }

      const professor = await this.professorService.registerProfessor(professorData)

      return response.status(201).send({
        message: "Professor created successfully",
        data: professor.serialize(),
      })
    } catch (error: any) {
      if (error.messages) {
        return response.status(422).send({ message: "Validation failed", errors: error.messages })
      }
      if (error.message.includes("já cadastrado")) {
        return response.status(409).send({ message: error.message })
      }
      return response.status(400).send({ message: error.message || "Erro ao criar professor" })
    }
  }

  
}
*/

/*import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import professors from 'App/Models/Professor'
import ProfessorValidator from 'App/Validators/ProfessorValidator'

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
}*/
