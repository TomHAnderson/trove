import { HalLink } from './hal-link';

// tslint:disable:variable-name
export class Role {
  id: number;
  roleId: string;
  _embedded: {
      parent: Role;
      user: HalLink;
  };
}
