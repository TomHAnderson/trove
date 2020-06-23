import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Identifier } from '@module/data/types/identifier';
import { DatabaseService } from '@module/data/service/database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trove-layout',
  templateUrl: './trove-layout.component.html',
  styleUrls: ['./trove-layout.component.scss']
})
export class TroveLayoutComponent {
  public url: string;
  public bookmark: Identifier;
  public bookmarkTimer: Observable<any>;

  constructor(
    private router: Router,
    private database: DatabaseService
  ) {
    this.router.events.subscribe((event: Event) => {
      // Google Analytics
      if (event instanceof NavigationEnd) {
        this.url = router.url;
      }
    });

    this.fetchBookmark();
  }

  public fetchBookmark() {
    // Fetch the current bookmark
    this.database.getItem('bookmark')
      .subscribe(identifier => this.bookmark = identifier);
  }

  public onActivate(event) {
    window.scroll(0, 0);
  }
}
