import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Identifier } from '@module/data/types/identifier';
import { DatabaseService } from '@module/data/service/database.service';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-trove-layout',
  templateUrl: './trove-layout.component.html',
  styleUrls: ['./trove-layout.component.scss']
})
export class TroveLayoutComponent implements OnInit {
  public url: string;
  public bookmark: Identifier;
  public bookmarkTimer: Observable<any>;

  constructor(
    private router: Router,
    private databaseService: DatabaseService
  ) {
    this.router.events.subscribe((event: Event) => {
      // Google Analytics
      if (event instanceof NavigationEnd) {
        this.url = router.url;
      }
    });

    this.bookmarkTimer = timer(1500, 1500);
    this.bookmarkTimer.subscribe(time => {
      this.databaseService.getItem('bookmark')
        .subscribe(identifier => this.bookmark = identifier);
    });
  }

  ngOnInit() {
  }

  onActivate(event) {
    window.scroll(0, 0);
  }
}
