import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Creator } from '@module/data/types/creator';
import * as localforage from 'localforage';

@Component({
  selector: 'app-favorite-creator',
  templateUrl: './favorite-creator.component.html',
  styleUrls: ['./favorite-creator.component.scss']
})
export class FavoriteCreatorComponent implements OnInit {
  public creators: Creator[];

  constructor() {
    this.creators = [];

    from(localforage.keys()).subscribe(keys => {
      keys.forEach(key => {
        if (key.substr(0, 7) === 'creator') {
          from(localforage.getItem(key))
            .subscribe((creator: Creator) => {
              this.creators.push(creator);

              this.creators.sort((a, b) => {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
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

}
