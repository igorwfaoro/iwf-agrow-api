import { IsNotEmpty } from 'class-validator';

export class FieldObserverInputModel {
  @IsNotEmpty()
  public metric: string;

  @IsNotEmpty()
  public operator: string;

  @IsNotEmpty()
  public threshold: number;

  @IsNotEmpty()
  public frequency: string;

  @IsNotEmpty()
  public isActive: boolean;
}
