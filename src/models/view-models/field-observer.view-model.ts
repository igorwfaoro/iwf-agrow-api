import { FieldObserver } from '../documents/field-observer';

export class FieldObserverViewModel {
  public id: string;
  public metric: string;
  public operator: string;
  public threshold: number;
  public frequency: string;
  public isActive: boolean;
  public createdAt: string;

  public static fromDocument(doc: FieldObserver): FieldObserverViewModel {
    const viewModel = new FieldObserverViewModel();

    viewModel.id = doc.id;
    viewModel.metric = doc.metric;
    viewModel.operator = doc.operator;
    viewModel.threshold = doc.threshold;
    viewModel.frequency = doc.frequency;
    viewModel.isActive = doc.isActive;
    viewModel.createdAt = doc.createdAt;

    return viewModel;
  }
}
