import { Component } from '@angular/core';
import { Identifier } from '@module/data/types/identifier';
import { Router } from '@angular/router';
import { DatabaseService } from '@module/data/service/database.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-favorite-identifier',
  templateUrl: './favorite-identifier.component.html',
  styleUrls: ['./favorite-identifier.component.scss']
})
export class FavoriteIdentifierComponent {
  public identifiers: Identifier[];

  constructor(
    public router: Router,
    public databaseService: DatabaseService,
    private titleService: Title
  ) {
    this.identifiers = [];

    this.titleService.setTitle('Favorite recordings');

    this.databaseService.keys().subscribe(keys => {
      keys.forEach(key => {
        if (key.substr(0, 10) === 'identifier') {
          this.databaseService.getItem(key)
            .subscribe((identifier: Identifier) => {
              this.identifiers.push(identifier);

              this.identifiers.sort((a, b) => {
                if (a.performanceDate < b.performanceDate) { return -1; }
                if (a.performanceDate > b.performanceDate) { return 1; }
                return 0;
              });
            });
        }
      });
    });
  }

  public identifierDetail(id) {
    this.router.navigate(['/trove/identifier',  id]);
  }
}
