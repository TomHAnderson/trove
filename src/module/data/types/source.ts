import { Datetime } from './datetime';
import { HalLinks } from './hal-links';
import { Performance } from './performance';
import { User } from './user';

// tslint:disable:variable-name
export class Source {
  id: number;
  createdAt: Datetime;
  lastUpdateAt: Datetime;
  circulationDate: string;
  shnDiscCount: number;
  wavDiscCount: number;
  description: string;
  summary: string;
  archiveIdentifier: string;
  mediaSize: number;
  mediaSizeUncompressed: number;
  isApproved: boolean;
  _embedded: {
    performance: Performance;
    user: User
    sourceChecksum: {
      _links: HalLinks;
    },
    sourceComment: {
      _links: HalLinks;
    },
    sourceLink: {
      _links: HalLinks;
    },
    userPerformance: {
      _links: HalLinks;
    }
  };
  _links: HalLinks;
}
