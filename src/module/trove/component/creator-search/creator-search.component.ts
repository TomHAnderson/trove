import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, of, Subject, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { CreatorService } from '@module/data/service/creator.service';
import { HalCreator } from '@module/data/types/hal-creator';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import * as localforage from 'localforage';

@Component({
  selector: 'app-creator-search',
  templateUrl: './creator-search.component.html',
  styleUrls: ['./creator-search.component.scss']
})
export class CreatorSearchComponent implements OnInit {
  @ViewChild('search')
  searchElement: ElementRef;

  public artistSearch: string;
  public halCreator: HalCreator;
  private searchString: Subject<string>;

  constructor(
    private creatorService: CreatorService,
    private location: Location,
    private titleService: Title,
  ) {
    this.searchString = new Subject();
    this.searchString
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(search => {
      this.location.go('/trove/search', '?search=' + encodeURI(search));
      this.titleService.setTitle('Search artists matching "' + search + '"');
      this.creatorService.searchByLetter('%' + search + '%')
        .subscribe(halCreator => {
          this.halCreator = halCreator;
          localforage.setItem('search', search);
        });

      this.artistSearch = search.replace('%', '');
    });

  }

  ngOnInit(): void {
    from(localforage.getItem('search')).subscribe((search: string) => {
      this.artistSearch = search;

      if (this.artistSearch) {
        this.searchString.next(this.artistSearch);
      }
      setTimeout(() => this.searchElement.nativeElement.focus(), 0);
    });
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

  submitSearch($event): void {
    this.searchString.next(this.artistSearch);
  }

  clearSearch() {
    this.searchString.next('');
    this.halCreator = null;
    setTimeout(() => this.searchElement.nativeElement.focus(), 0);
  }
}
