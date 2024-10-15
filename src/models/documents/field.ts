import * as dayjs from 'dayjs';
import { Collection, getRepository, Type } from 'fireorm';
import { Document } from 'src/models/abstract/document';
import { CoordinatePoint } from '../common/coordinate';
import { Weather } from '../common/weather';

@Collection('fields')
export class Field extends Document {
  public userId: string;
  public name: string;
  public culture: string;
  public color: string;
  public lastWeatherUpdate: string;
  public createdAt: string;

  @Type(() => CoordinatePoint)
  public coordinatePoint: CoordinatePoint;

  @Type(() => Weather)
  public weather: Weather;

  public static repository() {
    return getRepository(Field);
  }

  public static create(props: {
    userId: string;
    name: string;
    culture: string;
    color: string;
    coordinatePoint: CoordinatePoint;
    weather: Weather;
  }): Field {
    const field = new Field();

    field.userId = props.userId;
    field.name = props.name;
    field.culture = props.culture;
    field.color = props.color;
    field.coordinatePoint = props.coordinatePoint;
    field.weather = props.weather;
    field.lastWeatherUpdate = dayjs().toISOString();
    field.createdAt = dayjs().toISOString();

    return field;
  }
}
