import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClassroomService from 'App/Services/ClassroomService'

export default class ClassroomController {
  public async store(ctx: HttpContextContract) {
    return ClassroomService.createClassroom(ctx)
  }

  public async show(ctx: HttpContextContract) {
    return ClassroomService.showClassroom(ctx)
  }

  public async update(ctx: HttpContextContract) {
    return ClassroomService.updateClassroom(ctx)
  }

  public async destroy(ctx: HttpContextContract) {
    return ClassroomService.deleteClassroom(ctx)
  }
}


/*import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professor from 'App/Models/Professor'
import Classroom from 'App/Models/classroom'
import ClassroomValidator from 'App/Validators/ClassroomValidator'

export default class ClassroomController {
  public async store({ request, params, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ClassroomValidator)

      const registration = params.registration
      const professor = await Professor.findBy('numer_registration', registration)

      if (!professor) {
        return response.status(404).send({ message: "Professor not found" })
      }

      const existingRoom = await Classroom.query()
        .where('number_classroom', payload.number_classroom)
        .where('professor_id', professor.id)
        .first()

      if (existingRoom) {
        return response.status(409).send({ message: "Register professor already exists" })
      }

      const classroom = await Classroom.create({
        ...payload,
        professor_id: professor.id,
      })

      return response.status(201).send({
        message: "Room created",
        data: classroom,
      })
    } catch (error) {
      console.error(error)
      return response.status(400).send(error.messages || { message: "Validation or Request Error" })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { registration, classroomNumber } = params
    const professor = await Professor.findBy('numer_registration', registration)
    const classroom = await Classroom.findBy('number_classroom', classroomNumber)

    if (!professor) {
      return response.status(404).send({ message: "Professor not found" })
    }

    if (!classroom) {
      return response.status(404).send({ message: "Classroom not found" })
    }

    if (professor.id !== classroom.professor_id) {
      return response.status(401).send({ message: "You are not registered in this classroom" })
    }

    await classroom.delete()

    return {
      message: "Classroom deleted successfully",
      data: classroom,
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const { registration, classroomNumber } = params
    const professor = await Professor.findBy('numer_registration', registration)
    const classroom = await Classroom.findBy('number_classroom', classroomNumber)

    if (!classroom) {
      return response.status(404).send({ message: "Classroom not found" })
    }

    if (!professor) {
      return response.status(404).send({ message: "Professor not found" })
    }

    if (professor.id !== classroom.professor_id) {
      return response.status(401).send({ message: "Unauthorized access" })
    }

    return {
      data: classroom,
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ClassroomValidator)
      const { registration, classroomNumber } = params

      const professor = await Professor.findBy('numer_registration', registration)
      const classroom = await Classroom.findBy('number_classroom', classroomNumber)

      if (!professor) {
        return response.status(404).send({ message: "Professor not found" })
      }

      if (!classroom) {
        return response.status(404).send({ message: "Classroom not found" })
      }

      if (professor.id !== classroom.professor_id) {
        return response.status(401).send({ message: "Unauthorized access" })
      }

      classroom.number_classroom = payload.number_classroom
      classroom.capacity = payload.capacity
      classroom.avaliation = payload.avaliation

      await classroom.save()

      return {
        message: "Updated",
        data: classroom,
      }
    } catch (error) {
      console.error(error)
      return response.status(400).send(error.messages || { message: "Validation or Request Error" })
    }
  }
}

*/


/*import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import professors from 'App/models/Professor'
import Classroom from 'App/models/classroom'
import ClassroomValidator from 'App/validator/ClassroomValidator'

export default class ClassroomController {
  public async store({ request, params, response }: HttpContextContract) {
    try {
      await request.validate({ schema: ClassroomValidator })
      const body = request.body()
      const registration = params.registration
      const professor = await professors.findBy('numer_registration', registration)

      if (!professor) {
        return response.status(404).send({ message: "Professor not found" })
      }

      const existingRoom = await Classroom.query()
        .where('number_classroom', body.number_classroom)
        .where('professor_id', professor.id)
        .first()

      if (existingRoom) {
        return response.status(409).send({ message: "Register professor already exists" })
      }

      const createClassRoom = { ...body, professor_id: professor.id }
      const classroom = await Classroom.create(createClassRoom)

      response.status(201)

      return {
        message: "room created",
        data: classroom
      }
    } catch (error) {
      console.error(error)
      return response.status(500).send({ message: "Internal Server Error" })
    }
  }

  
    public async destroy({params, response}:HttpContextContract){
        const {registration, classroomNumber} = params
        const professor = await professors.findBy('numer_registration', registration);
        const classroom = await Classroom.findBy('number_classroom', classroomNumber)
        if(!professor){
            return response.status(404).send({message: "not found professor"})
        }
        if(!classroom){
            return response.status(404).send({message: "not found room"})
        }
        if(professor.id !== classroom.professor_id){
            response.status(401).send({message: "You are not registered in this classroom"})
            return
        } 
        await classroom.delete()
        return {
            message: "Classroom deleted successfully",
            data: classroom,
        }
    }
    public async show({params, response}:HttpContextContract){
        const {registration, classroomNumber} = params
        const professor = await professors.findBy('numer_registration', registration);
        const classroom = await Classroom.findBy('number_classroom', classroomNumber)
        if(!classroom){
            return response.status(404).send({message: "Classroom not found"})
        }
        if(!professor){
            return response.status(404).send({message: "Professor not found"})
        }
        if(professor.id !== classroom.professor_id){
            response.status(401).send({message: "unauthorized access"})
            return
        } 
        return {
            data: classroom
        }
    }
    
    public async update({ params, request, response }: HttpContextContract) {
        try {
          await request.validate({ schema: ClassroomValidator })
    
          const body = request.body()
          const { registration, classroomNumber } = params
    
          const professor = await professors.findBy('numer_registration', registration)
          const classroom = await Classroom.findBy("number_classroom", classroomNumber)
    
          if (!professor) {
            return response.status(404).send({ message: "Professor not found" })
          }
    
          if (!classroom) {
            return response.status(404).send({ message: "Classroom not found" })
          }
    
          if (professor.id !== classroom.professor_id) {
            response.status(401).send({ message: "unauthorized access" })
            return
          }
    
          classroom.number_classroom = body.classroom_number
          classroom.capacity = body.capacity
          classroom.avaliation = body.avaliation
    
          await classroom.save()
    
          return {
            message: "updated",
            data: classroom,
          }
        } catch (error) {
          console.error(error)
          return response.status(500).send({ message: "Internal Server Error" })
        }
      }
    
}
*/