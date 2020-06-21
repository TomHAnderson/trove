import { HalLinks } from './hal-links';
import { Identifier } from './identifier';

// tslint:disable:variable-name
export class HalIdentifier {
  _links: HalLinks;
  _embedded: {
      identifier: Identifier[];
  };
  page: number;
  page_count: number;
  total_items: number;
  page_size: number;
}
