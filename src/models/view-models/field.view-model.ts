import { CoordinatePoint } from '../common/coordinate';
import { Field } from '../documents/field';
import { FieldObserver } from '../documents/field-observer';
import { FieldObserverViewModel } from './field-observer.view-model';
import { WeatherViewModel } from './weather.view-model';

export class FieldViewModel {
  public id: string;
  public name: string;
  public culture: string;
  public color: string;
  public coordinatePoint: CoordinatePoint;
  public weather: WeatherViewModel;
  public createdAt: string;

  public observers?: FieldObserverViewModel[];

  public static fromDocument(
    doc: Field & { observers?: FieldObserver[] }
  ): FieldViewModel {
    const viewModel = new FieldViewModel();

    viewModel.id = doc.id;
    viewModel.name = doc.name;
    viewModel.culture = doc.culture;
    viewModel.color = doc.color;
    viewModel.coordinatePoint = doc.coordinatePoint;
    viewModel.weather = WeatherViewModel.fromDocument(doc.weather);
    viewModel.createdAt = doc.createdAt;

    viewModel.observers = doc.observers?.map(
      FieldObserverViewModel.fromDocument
    );

    return viewModel;
  }
}
