import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Professors from './Professor'
import Classroom from './classroom'
import Students from './Students'

export default class Allotment extends BaseModel {
  @hasMany(() => Students)
  public student: HasMany<typeof Students>

  @column({ isPrimary: true })
  public id: number

  @column()
  public professor_id: number
  
  @column()
  public classroom_id: number
  
  @column()
  public student_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Professors, {
    foreignKey: 'professor_id', 
  })
  public professor: BelongsTo<typeof Professors>;

  @belongsTo(() => Classroom, {
    foreignKey: 'classroom_id', 
  })
  public classroom: BelongsTo<typeof Classroom>;

  @belongsTo(() => Students, {
    foreignKey: 'student_id', 
  })
  public students: BelongsTo<typeof Students>;

}

