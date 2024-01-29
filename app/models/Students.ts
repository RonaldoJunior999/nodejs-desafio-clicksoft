import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Students extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public number_registration: string

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
      number_registration: this.number_registration,
      birth_date: this.birth_date.toFormat('yyyy-MM-dd'),
      created_at: this.created_at.toISO(),
      updated_at: this.updated_at.toISO(),
    };
  }
}

