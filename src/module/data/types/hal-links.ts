import { Type } from 'class-transformer';
import { HalLink } from './hal-link';

export class HalLinks {
  @Type(() => HalLink)
  self: HalLink;

  @Type(() => HalLink)
  prev: HalLink;

  @Type(() => HalLink)
  next: HalLink;

  @Type(() => HalLink)
  first: HalLink;

  @Type(() => HalLink)
  last: HalLink;
}
