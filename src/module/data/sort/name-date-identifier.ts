import { Identifier } from '../types/identifier';

export function NameDateIdentifier(identifierArray: Identifier[]) {
 identifierArray.sort((a, b) => {
    if (a._embedded.creator.name < b._embedded.creator.name) {
      return -1;
    }

    if (a._embedded.creator.name > b._embedded.creator.name) {
      return 1;
    }

    if (a.performanceDate < b.performanceDate) {
      return -1;
    }

    if (a.performanceDate > b.performanceDate) {
      return 1;
    }

    if (a.archiveIdentifier < b.archiveIdentifier) {
      return -1;
    }

    if (a.archiveIdentifier > b.archiveIdentifier) {
      return 1;
    }

    return 0;
  });
}
