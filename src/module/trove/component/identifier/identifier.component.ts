import { Component } from '@angular/core';
import { Title, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IdentifierService } from '@module/data/service/identifier.service';
import { Identifier } from '@module/data/types/identifier';
import { DatabaseService } from '@module/data/service/database.service';
import { TroveLayoutComponent } from '@module/trove/layout/trove-layout/trove-layout.component';
import { ListenedTo } from '@module/data/types/listened-to';

@Component({
  selector: 'app-identifier',
  templateUrl: './identifier.component.html',
  styleUrls: ['./identifier.component.scss']
})
export class IdentifierComponent {
  public identifier: Identifier;
  public embedUrl: SafeResourceUrl;
  public showDescription = false;
  public isFavorite = false;
  public isBookmarked = false;
  public listenedTo: ListenedTo;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private identifierService: IdentifierService,
    public sanitizer: DomSanitizer,
    private database: DatabaseService,
    private troveLayout: TroveLayoutComponent
  ) {
    this.route.params.subscribe(params => {
      this.identifierService.find(params.id)
        .subscribe(identifier => {
          this.identifier = identifier;

          this.titleService.setTitle(
            identifier._embedded.creator.name
              + ' · '
              + identifier.performanceDate
              + ' · '
              + identifier.archiveIdentifier
          );

          this.addToRecentlyBrowsed();

          this.database.getItem('bookmark')
            .subscribe(result => this.isBookmarked = result?.id === identifier.id);

          const storageIdentifier = 'identifier_' + identifier.id;
          this.database.getItem(storageIdentifier)
            .subscribe(result => this.isFavorite = Boolean(result));

          const listenedIdentifier = 'listened_' + identifier.id;
          this.database.getItem(listenedIdentifier)
            .subscribe(result => {
              this.listenedTo = (result) ? result : null;
            });

          this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            'https://archive.org/embed/' + identifier.archiveIdentifier + '?playlist=1&list_height=800'
          );
        });
    });
  }

  public toggleBookmark() {
    const identifier = 'bookmark';

    this.database.getItem(identifier).subscribe(result => {
      if (result?.id === this.identifier.id) {
        this.database.removeItem(identifier)
          .subscribe(() => this.troveLayout.fetchBookmark());
        this.isBookmarked = null;
      } else {
        this.isBookmarked = true;
        this.database.setItem(identifier, this.identifier)
          .subscribe(() => this.troveLayout.fetchBookmark());
      }
    });
  }

  public toggleListened() {
    const identifier = 'listened_' + this.identifier.id;

    this.database.getItem(identifier).subscribe(result => {
      if (result) {
        this.database.removeItem(identifier);
        this.listenedTo = null;
      } else {
        const now = new Date();
        this.listenedTo = new ListenedTo();
        this.listenedTo.date = (new Date()).toString();
        this.listenedTo.identifier = this.identifier;

        this.database.setItem(identifier, this.listenedTo);
      }
    });
  }

  public toggleFavorite() {
    const identifier = 'identifier_' + this.identifier.id;

    this.database.getItem(identifier).subscribe(result => {
      if (result) {
        this.database.removeItem(identifier);
        this.isFavorite = false;
      } else {
        this.database.setItem(identifier, this.identifier);
        this.isFavorite = true;
      }
    });
  }

  public addToRecentlyBrowsed() {
    this.database.getItem('recent').subscribe((recent: Identifier[]) => {
      if (! recent) {
        recent = [];
      }

      // Clear existing entry if exists
      recent = recent.filter(item => {
        return this.identifier.id !== item.id;
      });

      // Add this entry to top of index
      recent.unshift(this.identifier);

      // Resize recent to last 30
      recent = recent.slice(0, 30);

      this.database.setItem('recent', recent);
    });
  }
}
