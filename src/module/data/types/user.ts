import { HalLinks } from './hal-links';
import { Datetime } from './datetime';
import { Role } from './role';

// tslint:disable:variable-name
export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  rules: string;
  isActiveTrading: boolean;
  city: string;
  state: string;
  postalCode: string;
  description: string;
  createdAt: Datetime;
  lastUpdateAt: Datetime;
  _embedded: {
    performance: {
      links: HalLinks;
    }
    source: {
      _links: HalLinks;
    }
    sourceComment: {
      _links: HalLinks;
    }
    userFamily: {
      _links: HalLinks;
    }
    userFamilyExtended: {
      _links: HalLinks;
    }
    userFeedback: {
      _links: HalLinks;
    }
    userFeedbackPost: {
      _links: HalLinks;
    }
    userList: {
      _links: HalLinks;
    }
    userPerformance: {
      _links: HalLinks;
    }
    media: {
      _links: HalLinks;
    }
    userWantlist: {
      _links: HalLinks;
    }
    role: Array<Role>;
  };
  _links: HalLinks;
  _computed: {
    sourceArtist: any;
  };
}
