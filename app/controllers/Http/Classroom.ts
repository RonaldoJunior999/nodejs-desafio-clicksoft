import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professors from 'App/models/Professor'
import Classroom from 'App/models/classroom'
import ClassroomValidator from 'App/validator/ClassroomValidator'

export default class ClassroomController {
  public async store({ request, params, response }: HttpContextContract) {
    try {
      await request.validate({ schema: ClassroomValidator })

      const body = request.body()
      const registration = params.registration
      const professor = await Professors.findBy('registration_number', registration)

      if (!professor) {
        return response.status(404).send({ message: "not found professor" })
      }

      const existingRoom = await Classroom.query()
        .where('number_classroom', body.number_classroom)
        .where('professor_id', professor.id)
        .first()

      if (existingRoom) {
        return response.status(409).send({ message: "The professor already has a room with this number" })
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
        const professor = await Professors.findBy('number_registration', registration);
        const classroom = await Classroom.findBy('number_classroom', classroomNumber)
        if(!professor){
            return response.status(404).send({message: "not found professor"})
        }
        if(!classroom){
            return response.status(404).send({message: "not found room"})
        }
        if(professor.id !== classroom.professor_id){
            response.status(401).send({message: "this room does not belong to you"})
            return
        } 
        await classroom.delete()
        return {
            message: "room deleted successfully",
            data: classroom,
        }
    }
    public async show({params, response}:HttpContextContract){
        const {registration, roomNumber} = params
        const professor = await Professors.findBy('number_registration', registration);
        const classroom = await Classroom.findBy('number_classroom', roomNumber)
        if(!classroom){
            return response.status(404).send({message: "not found room"})
        }
        if(!professor){
            return response.status(404).send({message: "not found professor"})
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
    
          const professor = await Professors.findBy('number_registration', registration)
          const classroom = await Classroom.findBy("number_classroom", classroomNumber)
    
          if (!professor) {
            return response.status(404).send({ message: "not found professor" })
          }
    
          if (!classroom) {
            return response.status(404).send({ message: "not found room" })
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
