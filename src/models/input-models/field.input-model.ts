import { IsNotEmpty } from 'class-validator';
import { CoordinatePoint } from '../common/coordinate';

export class FieldInputModel {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public culture: string;

  @IsNotEmpty()
  public icon: string;

  @IsNotEmpty()
  public color: string;

  // TODO: transform to [number, number][]
  @IsNotEmpty()
  public areaPolygon: CoordinatePoint[];
}
