import { HttpException, HttpStatus } from '@nestjs/common';
import { MESSAGES } from '../util/messages';

export class ExternalServiceException extends HttpException {
  constructor(message: string = MESSAGES.EXTERNAL_SERVICE_ERROR) {
    super(message, HttpStatus.BAD_GATEWAY);
  }
}
