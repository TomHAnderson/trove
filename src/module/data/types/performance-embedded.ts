import { Artist } from './artist';
import { Type } from 'class-transformer';
import { EmbeddedLinks } from './embedded-links';
import { User } from './user';

export class PerformanceEmbedded {
  @Type(() => Artist)
  artist: Artist;

  @Type(() => User)
  user: User;

  source: EmbeddedLinks;
  performanceLink: EmbeddedLinks;
  performanceCorrection: EmbeddedLinks;
  userPerformance: EmbeddedLinks;
  wantlistUser: EmbeddedLinks;
}
