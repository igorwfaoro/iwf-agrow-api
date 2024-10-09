import { UnauthorizedException as CommonUnauthorizedException } from '@nestjs/common';
import { STRINGS } from '../util/strings';

export class UnauthorizedException extends CommonUnauthorizedException {
  constructor(message: string = STRINGS.UNAUTHORIZED) {
    super(message);
  }
}
