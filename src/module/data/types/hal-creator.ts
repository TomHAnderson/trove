import { HalLinks } from './hal-links';
import { Creator } from './creator';

// tslint:disable:variable-name
export class HalCreator {
  _links: HalLinks;
  _embedded: {
      creator: Creator[];
  };
  page: number;
  page_count: number;
  total_items: number;
  page_size: number;
}
