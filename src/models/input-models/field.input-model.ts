import { IsNotEmpty } from 'class-validator';
import { CoordinatePoint } from '../common/coordinate';

export class FieldInputModel {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public culture: string;

  @IsNotEmpty()
  public color: string;

  @IsNotEmpty()
  public coordinatePoint: CoordinatePoint;
}
