import { Component } from '@angular/core';
import { Creator } from '@module/data/types/creator';
import { DatabaseService } from '@module/data/service/database.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-favorite-creator',
  templateUrl: './favorite-creator.component.html',
  styleUrls: ['./favorite-creator.component.scss']
})
export class FavoriteCreatorComponent {
  public creatorArray: Creator[];

  constructor(
    private database: DatabaseService,
    private titleService: Title
  ) {
    this.creatorArray = [];

    this.titleService.setTitle('Favorite artists');

    this.database.keys().subscribe(keys => {
      keys.forEach(key => {
        if (key.substr(0, 7) === 'creator') {
          this.database.getItem(key)
            .subscribe((creator: Creator) => {
              this.creatorArray.push(creator);

              this.creatorArray.sort((a, b) => {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
                return 0;
              });
            });
        }
      });
    });
  }
}
