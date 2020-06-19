import { HalLinks } from './hal-links';

// tslint:disable:variable-name
export class Creator {
  id: number;
  name: string;
  _embedded: {
    identifier: {
      _links: HalLinks;
    };
  };
  _links: HalLinks;
  _computed: {
    years: string[];
  };
}
