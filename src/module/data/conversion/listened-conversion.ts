import { DatabaseService } from '../service/database.service';
import { IdentifierService } from '../service/identifier.service';
import { Identifier } from '../types/identifier';
import { Injectable } from '@angular/core';

/**
 * When listened functionality was first added only the date was saved to the
 * database.  After … was added listened needed its own page so a user could
 * browse all the shows they had marked as listened.
 *
 * This class converts listened entries with just a date to this format:
 * {
 *   date: string;
 *   identifier: Identifier;
 * }
 *
 * After this class has been ran a marker is added to the database so the
 * conversion will only ever be ran once.
 */

@Injectable({
  providedIn: 'root'
})
export class ListenedConversion {
  constructor(
    private database: DatabaseService,
    private identifierService: IdentifierService
  ) {
  }

  public convert() {
    this.database.getItem('listened_converted')
      .subscribe(listenedConverted => {
        if (listenedConverted) {
          return;
        }

        this.database.keys().subscribe((keys: any[]) => {
          keys.forEach((keyIndex) => {
            if (keyIndex.substr(0, 8) === 'listened') {
              this.database.getItem(keyIndex).subscribe((listened: any) => {
                if (! listened?.date) {
                  // This key needs to be converted
                  const newListened = {
                    date: listened,
                    identifier: null
                  };

                  this.identifierService.find(keyIndex.substr(10))
                    .subscribe((identifier: Identifier) => {
                      newListened.identifier = identifier;

                      this.database.setItem(keyIndex, newListened);
                    });
                }
              });
            }
          });
        });
        this.database.setItem('listened_converted', true);
    });
  }
}
