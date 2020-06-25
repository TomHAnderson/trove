import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { AppComponent } from '@app/app.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  public relatedApps: any[];

  constructor(
    private router: Router,
    public appComponent: AppComponent
  ) {
    // This doesn't work in Chrome; it would be nice to have.
    fromEvent(window, 'load').subscribe(event => {
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

    /**
     * If running as an app forward to list
     */
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.router.navigate(['/trove/list']);
    }
  }
}
