import { toPlain } from 'src/util/helpers/object.helper';
import { User } from '../documents/user';

export class UserJwt {
  id: string;
  name: string;
  email: string;
  createdAt: string;

  public static fromDocument(doc: User): UserJwt {
    const user = new UserJwt();

    user.id = doc.id;
    user.name = doc.name;
    user.email = doc.email;
    user.createdAt = doc.createdAt;

    return user;
  }

  public toPlain() {
    return toPlain(this);
  }
}
