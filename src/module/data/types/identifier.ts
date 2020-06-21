import { Datetime } from './datetime';
import { HalLinks } from './hal-links';
import { Creator } from './creator';
import { Collection } from './collection';
import { Source } from './source';

// tslint:disable:variable-name
export class Identifier {
  id: number;
  archiveIdentifier: string;
  performanceDate: string;
  addedAt: Datetime;
  title: string;
  description: string;
  uploader: string;
  venue: string;
  coverage: string;
  year: string;
  _embedded: {
    creator: Creator;
    collection: Collection[];
    source: Source;
  };
  _links: HalLinks;
}
