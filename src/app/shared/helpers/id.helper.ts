import * as uuid from 'uuid';

export default class IdHelper {
  static getUniqueId(): string {
    return uuid.v4();
  }
}
