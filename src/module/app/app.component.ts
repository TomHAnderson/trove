import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { ListenedConversion } from '@module/data/conversion/listened-conversion';

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
    private router: Router,
    private listenedConversion: ListenedConversion
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

    // Housecleaning
    this.listenedConversion.convert();
  }
}
