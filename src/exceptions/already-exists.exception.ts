import { HttpException, HttpStatus } from '@nestjs/common';
import { STRINGS } from '../util/strings';

export class AlreadyExistsException extends HttpException {
  constructor(message: string = STRINGS.ALREADY_EXISTS) {
    super(message, HttpStatus.CONFLICT);
  }
}
