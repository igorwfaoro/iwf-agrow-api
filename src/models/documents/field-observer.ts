import * as dayjs from 'dayjs';
import { Collection, getRepository } from 'fireorm';
import { Document } from 'src/models/abstract/document';

@Collection('fieldObserver')
export class FieldObserver extends Document {
  public userId: string;
  public fieldId: string;
  public metric: string;
  public operator: string;
  public threshold: number;
  public frequency: string;
  public isActive: boolean;
  public createdAt: string;

  public static repository() {
    return getRepository(FieldObserver);
  }

  public static create(props: {
    userId: string;
    fieldId: string;
    metric: string;
    operator: string;
    threshold: number;
    frequency: string;
    isActive: boolean;
  }): FieldObserver {
    const fieldObserver = new FieldObserver();

    fieldObserver.userId = props.userId;
    fieldObserver.fieldId = props.fieldId;
    fieldObserver.metric = props.metric;
    fieldObserver.operator = props.operator;
    fieldObserver.threshold = props.threshold;
    fieldObserver.frequency = props.frequency;
    fieldObserver.isActive = props.isActive;
    fieldObserver.createdAt = dayjs().toISOString();

    return fieldObserver;
  }
}
