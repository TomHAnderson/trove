import { Component, Input } from '@angular/core';
import { Identifier } from '@module/data/types/identifier';
import { Router } from '@angular/router';
import { DatabaseService } from '@module/data/service/database.service';

@Component({
  selector: 'app-identifier-list',
  templateUrl: './identifier-list.component.html',
  styleUrls: ['./identifier-list.component.scss']
})
export class IdentifierListComponent {
  public keys: string[];

  @Input()
  identifierArray: Identifier[];

  @Input()
  showName = false;

  @Input()
  showFavoriteIcon = true;

  constructor(
    private router: Router,
    private database: DatabaseService
  ) {
    this.database.keys().subscribe(keys => this.keys = keys);
  }

  public identifierDetail(id) {
    this.router.navigate(['/trove/identifier',  id]);
  }
}
