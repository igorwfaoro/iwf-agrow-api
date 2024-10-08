import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../exceptions/not-found.exception';
import { FieldObserver } from '../models/documents/field-observer';
import { FieldObserverInputModel } from '../models/input-models/field-observer.input-model';
import { FieldObserverViewModel } from '../models/view-models/field-observer.view-model';
import { MESSAGES } from '../util/messages';

@Injectable()
export class FieldObserverService {
  public async list(
    userId: string,
    fieldId: string
  ): Promise<FieldObserverViewModel[]> {
    const observers = await FieldObserver.repository()
      .whereEqualTo('userId', userId)
      .whereEqualTo('fieldId', fieldId)
      .find();

    return observers.map(FieldObserverViewModel.fromDocument);
  }

  public async get(
    userId: string,
    fieldId: string,
    id: string
  ): Promise<FieldObserverViewModel> {
    const observer = await FieldObserver.repository()
      .whereEqualTo('userId', userId)
      .whereEqualTo('fieldId', fieldId)
      .whereEqualTo('id', id)
      .findOne();

    if (!observer)
      throw new NotFoundException(MESSAGES.FIELD_OBSERVER_NOT_FOUND);

    return FieldObserverViewModel.fromDocument(observer);
  }

  public async create(
    userId: string,
    fieldId: string,
    input: FieldObserverInputModel
  ): Promise<FieldObserverViewModel> {
    const observer = FieldObserver.create({ ...input, userId, fieldId });
    const newObserver = await FieldObserver.repository().create(observer);
    return FieldObserverViewModel.fromDocument(newObserver);
  }

  public async update(
    userId: string,
    fieldId: string,
    id: string,
    input: FieldObserverInputModel
  ): Promise<FieldObserverViewModel> {
    const observer = await FieldObserver.repository()
      .whereEqualTo('userId', userId)
      .whereEqualTo('fieldId', fieldId)
      .whereEqualTo('id', id)
      .findOne();

    if (!observer)
      throw new NotFoundException(MESSAGES.FIELD_OBSERVER_NOT_FOUND);

    observer.metric = input.metric;
    observer.operator = input.operator;
    observer.threshold = input.threshold;
    observer.frequency = input.frequency;
    observer.isActive = input.isActive;

    const updatedObserver = await FieldObserver.repository().update(observer);

    return FieldObserverViewModel.fromDocument(updatedObserver);
  }

  public async remove(
    userId: string,
    fieldId: string,
    id: string
  ): Promise<void> {
    const observer = await FieldObserver.repository()
      .whereEqualTo('userId', userId)
      .whereEqualTo('fieldId', fieldId)
      .whereEqualTo('id', id)
      .findOne();

    if (!observer)
      throw new NotFoundException(MESSAGES.FIELD_OBSERVER_NOT_FOUND);

    await FieldObserver.repository().delete(observer.id);
  }
}
