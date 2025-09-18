import { DateTime } from 'luxon'
import Professor from 'App/Models/Professor'

export interface ProfessorData {
  name: string
  email: string
  numer_registration: string
  birth_date: DateTime
}

export default class ProfessorService {
  public async registerProfessor(data: ProfessorData) {
    const professorEmailExist = await Professor.findBy('email', data.email)
    const professorRegistrationExist = await Professor.findBy('numer_registration', data.numer_registration)

    if (professorEmailExist || professorRegistrationExist) {
      throw new Error('Professor already exists')
    }

    return await Professor.create(data)
  }

  public async getProfessor(registration: string) {
    return await Professor.findBy('numer_registration', registration)
  }

  public async updateProfessor(registration: string, data: ProfessorData) {
    const professor = await Professor.findBy('numer_registration', registration)

    if (!professor) return null

    professor.merge(data)
    await professor.save()

    return professor
  }

  public async deleteProfessor(registration: string) {
    const professor = await Professor.findBy('numer_registration', registration)

    if (!professor) return false

    await professor.delete()
    return true
  }
}



/*import Professor from 'App/Models/Professor'
import { DateTime } from 'luxon'

export interface ProfessorData {
  name: string
  email: string
  numer_registration: string
  birth_date: string | Date | DateTime
  password: string
}

export default class ProfessorService {
  public async registerProfessor(data: ProfessorData) {
    const { name, email, numer_registration, birth_date, password } = data

    const existingEmail = await Professor.findBy('email', email)
    if (existingEmail) throw new Error('Email já cadastrado')

    const existingRegistration = await Professor.findBy('numer_registration', numer_registration)
    if (existingRegistration) throw new Error('Número de registro já cadastrado')

    const professor = await Professor.create({
      name,
      email,
      numer_registration,
      birth_date: birth_date instanceof DateTime
        ? birth_date
        : DateTime.fromJSDate(new Date(birth_date)),
      password,
    })

    return professor
  }
}*/
