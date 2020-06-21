import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public deferredInstallPrompt: any;
  public relatedApps: any[];

  constructor(
    private router: Router
  ) {

    fromEvent(window, 'beforeinstallprompt').subscribe(event => {
      event.preventDefault();
      this.deferredInstallPrompt = event;
    });

    fromEvent(window, 'appinstalled').subscribe(event => {
      this.router.navigate(['/trove/list']);
    });

    fromEvent(window, 'load').subscribe(event => {
//      this.router.navigate(['/trove/list']);
      if ('getInstalledRelatedApps' in window.navigator) {
        const nav: any = window.navigator;

        nav.getInstalledRelatedApps().then(relatedApps => {
          if (relatedApps.length) {
            this.relatedApps = relatedApps;
            console.log(this.relatedApps);
            alert('related apps');
          }
        });
      }
    });

    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.router.navigate(['/trove/list']);
    } else {

    }
  }

  ngOnInit(): void {
  }
}
