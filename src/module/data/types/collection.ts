import { HalLinks } from './hal-links';

// tslint:disable:variable-name
export class Collection {
  id: number;
  name: string;
  _embedded: {
    identifier: HalLinks;
  };
  _links: HalLinks;
}
