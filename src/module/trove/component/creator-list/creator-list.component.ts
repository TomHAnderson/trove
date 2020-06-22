import { Component, OnInit } from '@angular/core';
import { Subject, from } from 'rxjs';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { CreatorService } from '@module/data/service/creator.service';
import { HalCreator } from '@module/data/types/hal-creator';
import { Router } from '@angular/router';
import { DatabaseService } from '@module/data/service/database.service';

@Component({
  selector: 'app-creator-list',
  templateUrl: './creator-list.component.html',
  styleUrls: ['./creator-list.component.scss']
})
export class CreatorListComponent implements OnInit {
  public currentSearch: string;
  private searchString: Subject<string>;
  public halCreator: HalCreator;

  constructor(
    private location: Location,
    private titleService: Title,
    private creatorService: CreatorService,
    private router: Router,
    private databaseService: DatabaseService
  ) {
    this.searchString = new Subject();

    this.searchString.subscribe(search => {
      this.location.go('/trove/list', '?search=' + encodeURI(search));
      this.location.replaceState('/trove/list/?search=' + encodeURI(search));
      this.titleService.setTitle('Search artists matching "' + search + '"');

      this.creatorService.searchByLetter(search)
        .subscribe(halCreator => {
          this.halCreator = halCreator;
          this.databaseService.setItem('list', search);
        });

      this.currentSearch = search.replace('%', '');
    });
  }

  public ngOnInit() {
    this.databaseService.getItem('list').subscribe((search: string) => {
      this.currentSearch = search;

      if (this.currentSearch) {
        this.searchString.next(this.currentSearch);
      } else {
        this.searchString.next('A');
      }
    });
  }

  public search(search) {
    this.searchString.next(search);
  }

  public onScroll() {
    this.creatorService.loadLink(this.halCreator._links.next)
      .subscribe(halCreator => {
        // Copy links and append creators
        this.halCreator._links = halCreator._links;
        this.halCreator._embedded.creator =
          this.halCreator._embedded.creator.concat(halCreator._embedded.creator);
      });
  }

  public alphabet(): Array<string> {
    const alphabet: string[] = [];

    for (let i = 65; i <= 90; i++) {
      alphabet.push(String.fromCharCode(i));
    }

    return alphabet;
  }

  public creatorDetail(id) {
    this.router.navigate(['/trove/creator',  id]);
  }
}
