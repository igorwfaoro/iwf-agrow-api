import { NotFoundException as CommonNotFoundException } from '@nestjs/common';
import { STRINGS } from '../util/strings';

export class NotFoundException extends CommonNotFoundException {
  constructor(message: string = STRINGS.NOT_FOUND) {
    super(message);
  }
}
