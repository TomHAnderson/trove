import { Datetime } from './datetime';
import { HalLinks } from './hal-links';
import { User } from './user';
import { Type } from 'class-transformer';

// tslint:disable:variable-name
export class Artist {
  id: number;
  name: string;
  abbreviation: string;
  officialUrl: string;
  createdAt: Datetime;
  description: string;
  icon: string;
  isTradable: boolean;
  _embedded: {
    artistAlias: {
      _links: HalLinks;
    };
    artistLink: {
      _links: HalLinks;
    };
    performance: {
      _links: HalLinks;
    };
    artistGroup: {
      _links: HalLinks;
    };
    shnFlacArtist: {
      _links: HalLinks;
    }

    user: User;
    lastUser: User;
  };
  _links: HalLinks;
  _computed: {
      years: Array<number>;
  };
}
