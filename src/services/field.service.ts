import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as dayjs from 'dayjs';
import { STRINGS } from 'src/util/strings';
import { NotFoundException } from '../exceptions/not-found.exception';
import { Field } from '../models/documents/field';
import { FieldInputModel } from '../models/input-models/field.input-model';
import { FieldViewModel } from '../models/view-models/field.view-model';
import { WeatherService } from './weather.service';

@Injectable()
export class FieldService {
  constructor(private readonly weatherService: WeatherService) {}

  public async list(userId: string): Promise<FieldViewModel[]> {
    const fields = await Field.repository()
      .whereEqualTo('userId', userId)
      .find();

    return fields.map(FieldViewModel.fromDocument);
  }

  public async get(userId: string, id: string): Promise<FieldViewModel> {
    const field = await Field.repository()
      .whereEqualTo('userId', userId)
      .whereEqualTo('id', id)
      .findOne();

    if (!field) throw new NotFoundException(STRINGS.FIELD_NOT_FOUND);

    return FieldViewModel.fromDocument(field);
  }

  public async create(
    userId: string,
    input: FieldInputModel
  ): Promise<FieldViewModel> {
    const weather = await this.weatherService.getFromLocation(
      input.coordinatePoint
    );

    const field = Field.create({ ...input, weather, userId });
    const newField = await Field.repository().create(field.toPlain());
    return FieldViewModel.fromDocument(newField);
  }

  public async update(
    userId: string,
    id: string,
    input: FieldInputModel
  ): Promise<FieldViewModel> {
    const field = await Field.repository()
      .whereEqualTo('userId', userId)
      .whereEqualTo('id', id)
      .findOne();

    if (!field) throw new NotFoundException(STRINGS.FIELD_NOT_FOUND);

    field.name = input.name;
    field.culture = input.culture;
    field.color = input.color;
    field.coordinatePoint = input.coordinatePoint;

    const updatedField = await Field.repository().update(field.toPlain());

    return FieldViewModel.fromDocument(updatedField);
  }

  public async remove(userId: string, id: string): Promise<void> {
    const field = await Field.repository()
      .whereEqualTo('userId', userId)
      .whereEqualTo('id', id)
      .findOne();

    if (!field) throw new NotFoundException(STRINGS.FIELD_NOT_FOUND);

    await Field.repository().delete(field.id);
  }

  @Cron('*/15 * * * *')
  public async updateWeather(): Promise<void> {
    const fields = await Field.repository().find();

    const weatherPromises = fields.map((field) =>
      this.weatherService.getFromLocation(field.coordinatePoint)
    );

    Promise.all(weatherPromises).then((weathers) => {
      fields.forEach(async (field, index) => {
        field.weather = weathers[index];
        field.lastWeatherUpdate = dayjs().toISOString();

        await Field.repository().update(field.toPlain());
      });
    });
  }
}
