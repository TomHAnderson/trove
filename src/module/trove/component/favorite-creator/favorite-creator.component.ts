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
  public creators: Creator[];

  constructor(
    private databaseService: DatabaseService,
    private titleService: Title
  ) {
    this.creators = [];

    this.titleService.setTitle('Favorite artists');

    this.databaseService.keys().subscribe(keys => {
      keys.forEach(key => {
        if (key.substr(0, 7) === 'creator') {
          this.databaseService.getItem(key)
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
    });
  }
}
