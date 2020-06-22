import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-trove-layout',
  templateUrl: './trove-layout.component.html',
  styleUrls: ['./trove-layout.component.scss']
})
export class TroveLayoutComponent implements OnInit {
  public url: string;

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      // Google Analytics
      if (event instanceof NavigationEnd) {
        this.url = router.url;
      }
    });
  }

  ngOnInit() {
  }

  onActivate(event) {
    window.scroll(0, 0);
  }
}
