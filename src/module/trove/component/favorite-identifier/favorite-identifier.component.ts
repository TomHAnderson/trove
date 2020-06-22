import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Creator } from '@module/data/types/creator';
import * as localforage from 'localforage';
import { Identifier } from '@module/data/types/identifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-identifier',
  templateUrl: './favorite-identifier.component.html',
  styleUrls: ['./favorite-identifier.component.scss']
})
export class FavoriteIdentifierComponent implements OnInit {
  public identifiers: Identifier[];

  constructor(
    public router: Router
  ) {
    this.identifiers = [];

    from(localforage.keys()).subscribe(keys => {
      keys.forEach(key => {
        if (key.substr(0, 10) === 'identifier') {
          from(localforage.getItem(key))
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
      console.log(keys);
    });
  }

  ngOnInit(): void {
  }

  public identifierDetail(id) {
    this.router.navigate(['/trove/identifier',  id]);
  }

}
