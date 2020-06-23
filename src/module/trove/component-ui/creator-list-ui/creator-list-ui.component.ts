import { Component, Input } from '@angular/core';
import { Creator } from '@module/data/types/creator';
import { DatabaseService } from '@module/data/service/database.service';

@Component({
  selector: 'app-creator-list-ui',
  templateUrl: './creator-list-ui.component.html',
  styleUrls: ['./creator-list-ui.component.scss']
})
export class CreatorListUiComponent {
  public keys: string[];

  @Input()
  creatorArray: Creator[];

  @Input()
  showFavoriteIcon = true;

  constructor(
    private database: DatabaseService
  ) {
    this.database.keys().subscribe(keys => this.keys = keys);
  }
}
