import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Allotment from 'App/models/Allotmet';
import Professors from 'App/models/Professor';
import Classroom from 'App/models/classroom';
import Students from 'App/models/Students';
import AllotmentValidator from 'App/validator/AllotmentValidator';

export default class AllocationsController {
    public async store({request, response}:HttpContextContract){
        try{
        const body= request.body()
        const professors = await Professors.findBy('number_registration', body.registration_professor);
        const classroom = await Classroom.findBy('number_classroom', body.number_classroom);
        const student = await Students.findBy('email', body.email_student);
        if(!professors){
          return response.status(404).send({message: "not found professor"})
        }
        if(!classroom){
          return response.status(404).send({message: "not found room"})
        }
        if(!student){
          return response.status(404).send({message: "not found student"})
        }
        if(classroom.avaliation === false){
            return response.status(401).send({message: "it is not possible to relocate students in this classroom"})
        }
        
        const totalAllotmentInClassroom = await Allotment.query().where('room_id', classroom.id).count('id as count');
        const totalStudentsInClassroom = totalAllotmentInClassroom[0].$extras.count;
        if (totalStudentsInClassroom >= classroom.capacity) {
          return response.status(409).send({ message: 'Room capacity exceeded' });
        }
        
        const allotmentStudent = await Allotment.query()
        .where('student_id', student.id)
        .where('room_id', classroom.id)
        .first();

        if(classroom.professor_id !== professors.id){
            return response.status(401).send({message: "teacher is not the owner of this room"})
        }
        if (allotmentStudent) {
        return response.status(409).send({ message: "student already in this classroom" });
        }

        const createAllotment = {professor_id: professors.id, room_id: classroom.id, student_id: student.id}
        const allotment = await Allotment.create(createAllotment)

        response.status(201)

        return {
            message: "allotment created",
            data: allotment
        }
    }
    catch (error) {
        console.error(error)
        return response.status(500).send({ message: "Internal Server Error" })
      }
    }
    public async destroy({params, request, response}:HttpContextContract){
        try{
        await request.validate({ schema: AllotmentValidator })
        const classroom = await Classroom.findBy('number_classroom', params.number_classroom);
        const professors = await Professors.findBy('number_registration', params.registration);
        if(!professors){
          return response.status(404).send({message: "not found room"})
        }
        if(!classroom){
          return response.status(404).send({message: "not found room"})
        }
        const student = await Allotment.query()
        .where('student_id',params.idStudent)
        .where('room_id', classroom.id)
        .first();

        if (!student) {
            response.status(404)
            return {
              message: 'Student not found in this classroom',
            };
        }
      
        await student.delete();
        response.status(201);
        return {
            message: "student deleted successfully",
            data: student,
        }
    }
    catch (error) {
        console.error(error)
        return response.status(500).send({ message: "Internal Server Error" })
      }
    }
    public async index({ params, response, request}: HttpContextContract) {
    try{
      await request.validate({ schema: AllotmentValidator })
      const classroom = await Classroom.findBy('number_classroom', params.classroom);
      const professors = await Professors.findBy('number_registration', params.registration);
      if (!classroom || classroom.professor_id !== professors?.id) {
      return response.status(404).send({message: 'Room not found'});
      }
      if (!professors) {
        return response.status(404).send({message: 'Professor not found'});
      }
      const classroomStudents = await Allotment.query().where('room_id', classroom.id).where('professor_id', professors.id).preload('students');
      const students = classroomStudents.map((allotment) => allotment.students);
      
      response.status(201)

      return {
        message:'return sucessful',
        data: students,
      }
    }
    catch (error) {
        console.error(error)
        return response.status(500).send({ message: "Internal Server Error" })
      }
    }
}

