import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, from } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CreatorService } from '@module/data/service/creator.service';
import { HalCreator } from '@module/data/types/hal-creator';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DatabaseService } from '@module/data/service/database.service';

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
    private titleService: Title,
    private router: Router,
    private database: DatabaseService
  ) {
    this.searchString = new Subject();

    this.titleService.setTitle('Search artists');

    this.searchString.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(search => {
      this.creatorService.searchByLetter('%' + search + '%')
        .subscribe(halCreator => {
          this.halCreator = halCreator;
          this.database.setItem('search', search);
        });

      this.artistSearch = search.replace('%', '');
    });
  }

  ngOnInit(): void {
    this.database.getItem('search').subscribe((search: string) => {
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

  public submitSearch($event): void {
    this.searchString.next(this.artistSearch);
  }

  public clearSearch() {
    this.searchString.next('');
    this.halCreator = null;
    setTimeout(() => this.searchElement.nativeElement.focus(), 0);
  }

  public creatorDetail(id) {
    this.router.navigate(['/trove/creator',  id]);
  }
}
