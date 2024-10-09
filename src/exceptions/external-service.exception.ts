import { HttpException, HttpStatus } from '@nestjs/common';
import { STRINGS } from '../util/strings';

export class ExternalServiceException extends HttpException {
  constructor(message: string = STRINGS.EXTERNAL_SERVICE_ERROR) {
    super(message, HttpStatus.BAD_GATEWAY);
  }
}
