import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, Event, NavigationEnd } from '@angular/router';

// tslint:disable-next-line:ban-types
declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Trove';
  public version: string;

  constructor(
    private titleService: Title,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      // Google Analytics
      if (event instanceof NavigationEnd) {
        ga('set', 'page', router.url);
        ga('send', 'pageview');
      }
    });

    // Get version
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        this.version = xmlhttp.responseText;
      }
    };

    xmlhttp.open('GET', '/assets/version.txt', false );
    xmlhttp.send();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
