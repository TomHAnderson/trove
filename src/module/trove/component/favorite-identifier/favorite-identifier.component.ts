import { Component } from '@angular/core';
import { Identifier } from '@module/data/types/identifier';
import { Router } from '@angular/router';
import { DatabaseService } from '@module/data/service/database.service';
import { Title } from '@angular/platform-browser';
import { NameDateIdentifier as sortIdentifierArray } from '@module/data/sort/name-date-identifier';

@Component({
  selector: 'app-favorite-identifier',
  templateUrl: './favorite-identifier.component.html',
  styleUrls: ['./favorite-identifier.component.scss']
})
export class FavoriteIdentifierComponent {
  public identifierArray: Identifier[];

  constructor(
    public router: Router,
    public database: DatabaseService,
    private titleService: Title
  ) {
    this.identifierArray = [];

    this.titleService.setTitle('Favorite recordings');

    this.database.keys().subscribe(keys => {
      keys.forEach(key => {
        if (key.substr(0, 10) === 'identifier') {
          this.database.getItem(key)
            .subscribe((identifier: Identifier) => {
              this.identifierArray.push(identifier);

              sortIdentifierArray(this.identifierArray);
            });
        }
      });
    });
  }
}
