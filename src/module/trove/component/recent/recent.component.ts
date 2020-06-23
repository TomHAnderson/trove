import { Component } from '@angular/core';
import { DatabaseService } from '@module/data/service/database.service';
import { Identifier } from '@module/data/types/identifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})
export class RecentComponent {
  public recent: Identifier[];

  constructor(
    private database: DatabaseService,
    private router: Router
  ) {
    this.database.getItem('recent')
      .subscribe(recent => this.recent = recent);
  }

  public identifierDetail(id) {
    this.router.navigate(['/trove/identifier',  id]);
  }
}
