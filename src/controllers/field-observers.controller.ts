import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { User } from '../decorators/user';
import { UserJwt } from '../models/common/user-jwt';
import { FieldObserverInputModel } from '../models/input-models/field-observer.input-model';
import { FieldObserverViewModel } from '../models/view-models/field-observer.view-model';
import { FieldObserverService } from '../services/field-observer.service';

@Controller('fields/:fieldId/observers')
export class FieldObserversController {
  constructor(private readonly fieldObserverService: FieldObserverService) {}

  @Get()
  public list(
    @User() user: UserJwt,
    @Param() params: { fieldId: string }
  ): Promise<FieldObserverViewModel[]> {
    return this.fieldObserverService.list(user.id, params.fieldId);
  }

  @Get(':id')
  public get(
    @User() user: UserJwt,
    @Param() params: { fieldId: string; id: string }
  ): Promise<FieldObserverViewModel> {
    return this.fieldObserverService.get(user.id, params.fieldId, params.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(
    @User() user: UserJwt,
    @Param() params: { fieldId: string },
    @Body() input: FieldObserverInputModel
  ): Promise<FieldObserverViewModel> {
    return this.fieldObserverService.create(user.id, params.fieldId, input);
  }

  @Put(':id')
  public update(
    @User() user: UserJwt,
    @Param() params: { fieldId: string; id: string },
    @Body() input: FieldObserverInputModel
  ): Promise<FieldObserverViewModel> {
    return this.fieldObserverService.update(
      user.id,
      params.fieldId,
      params.id,
      input
    );
  }

  @Delete(':id')
  public remove(
    @User() user: UserJwt,
    @Param() params: { fieldId: string; id: string }
  ): Promise<void> {
    return this.fieldObserverService.remove(user.id, params.fieldId, params.id);
  }
}
