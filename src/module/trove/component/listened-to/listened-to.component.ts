import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '@module/data/service/database.service';
import { Title } from '@angular/platform-browser';
import { ListenedTo } from '@module/data/types/listened-to';

@Component({
  selector: 'app-listened-to',
  templateUrl: './listened-to.component.html',
  styleUrls: ['./listened-to.component.scss']
})
export class ListenedToComponent {
  public listenedToArray: ListenedTo[];
  public keys: string[];

  constructor(
    public router: Router,
    public database: DatabaseService,
    private titleService: Title
  ) {
    this.listenedToArray = [];

    this.titleService.setTitle('Listened-to recordings');

    this.database.keys().subscribe(keys => {
      this.keys = keys;

      keys.forEach(key => {
        if (key.substr(0, 8) === 'listened') {
          this.database.getItem(key)
            .subscribe((listenedTo: ListenedTo) => {
              if (! listenedTo?.date) {
                return;
              }

              this.listenedToArray.push(listenedTo);

              this.listenedToArray.sort((a, b) => {
                if ((new Date(a.date)) < (new Date(b.date))) {
                  return 1;
                }

                if ((new Date(a.date)) > (new Date(b.date))) {
                  return -1;
                }

                return 0;
              });
            });
        }
      });
    });
  }

  public identifierDetail(id) {
    this.router.navigate(['/trove/identifier',  id]);
  }
}
