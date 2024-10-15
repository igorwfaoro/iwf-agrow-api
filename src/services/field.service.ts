import { Injectable } from '@nestjs/common';
import { toPlain } from 'src/util/helpers/object.helper';
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
    const newField = await Field.repository().create(field);
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

    const updatedField = await Field.repository().update(toPlain(field));

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
}
