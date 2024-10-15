import { toPlain } from 'src/util/helpers/object.helper';

export abstract class Document {
  id: string;

  public toPlain() {
    return toPlain(this);
  }
}
