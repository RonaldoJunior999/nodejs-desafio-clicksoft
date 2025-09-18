import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

export default class Professor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public numer_registration: string

  @column({ serializeAs: null }) // nunca expor senha
  public password: string

  @column.date()
  public birth_date: DateTime

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @beforeSave()
  public static async hashPassword(professor: Professor) {
    if (professor.$dirty.password) {
      professor.password = await Hash.make(professor.password)
    }
  }

  public serialize() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      numer_registration: this.numer_registration,
      birth_date: this.birth_date.toFormat('yyyy-MM-dd'),
      created_at: this.created_at.toISO(),
      updated_at: this.updated_at.toISO(),
    }
  }
}


/*import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class professors extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public numer_registration: string

  @column.dateTime()
  public birth_date: DateTime

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  public serialize() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      number_registration: this.numer_registration,
      birth_date: this.birth_date.toFormat('yyyy-MM-dd'),
      created_at: this.created_at.toISO(),
      updated_at: this.updated_at.toISO(),
    };
  }
}*/
