import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Professor from './Professor';

export default class Classroom extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public number_classroom: string;

  @column()
  public capacity: number;

  @column()
  public avaliation: boolean;

  @column()
  public professor_id: number;

  @belongsTo(() => Professor, {
    foreignKey: 'professor_id', 
  })
  public professor: BelongsTo<typeof Professor>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
