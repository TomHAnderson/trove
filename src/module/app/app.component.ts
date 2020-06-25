import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { ListenedConversion } from '@module/data/conversion/listened-conversion';
import { fromEvent } from 'rxjs';

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
  public deferredInstallPrompt: any;

  constructor(
    private router: Router,
    private listenedConversion: ListenedConversion,
  ) {
    // Google Analytics
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', router.url);
        ga('send', 'pageview');
      }
    });

    fromEvent(window, 'beforeinstallprompt').subscribe(event => {
      event.preventDefault();
      this.deferredInstallPrompt = event;
    });

    fromEvent(window, 'appinstalled').subscribe(event => {
      this.router.navigate(['/trove/list']);
      this.deferredInstallPrompt = null;
    });

    // Get version document
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        this.version = xmlhttp.responseText;
      }
    };
    xmlhttp.open('GET', '/assets/version.txt', false );
    xmlhttp.send();

    /**
     * Housecleaning
     *
     * These are services which fix existing data and such.  Ran every time
     * but each servcie sets a key once it has been ran so it won't re-run.
     */

    // Change listened from a date to a date and identifier
    this.listenedConversion.convert();
  }
}
