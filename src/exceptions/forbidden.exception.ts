import { ForbiddenException as CommonForbiddenException } from '@nestjs/common';
import { STRINGS } from '../util/strings';

export class ForbiddenException extends CommonForbiddenException {
  constructor(message: string = STRINGS.FORBIDDEN) {
    super(message);
  }
}
