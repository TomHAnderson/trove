import { Component } from '@angular/core';
import { Title, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IdentifierService } from '@module/data/service/identifier.service';
import { Identifier } from '@module/data/types/identifier';
import { DatabaseService } from '@module/data/service/database.service';

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

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private identifierService: IdentifierService,
    public sanitizer: DomSanitizer,
    private databaseService: DatabaseService
  ) {
    this.route.params.subscribe(params => {
      this.identifierService.find(params.id)
        .subscribe(identifier => {
          this.titleService.setTitle(
            identifier._embedded.creator.name
              + ' · '
              + identifier.performanceDate
              + ' · '
              + identifier.archiveIdentifier
          );

          const storageIdentifier = 'identifier_' + identifier.id;
          this.databaseService.getItem(storageIdentifier)
            .subscribe(result => this.isFavorite = Boolean(result));

          this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            'https://archive.org/embed/' + identifier.archiveIdentifier + '?playlist=1&list_height=800'
          );

          console.log(this.embedUrl);

          this.identifier = identifier;
        });
    });
  }

  public toggleFavorite() {
    const identifier = 'identifier_' + this.identifier.id;

    this.databaseService.getItem(identifier).subscribe(result => {
      if (result) {
        this.databaseService.removeItem(identifier);
        this.isFavorite = false;
      } else {
        this.databaseService.setItem(identifier, this.identifier);
        this.isFavorite = true;
      }
    });
  }
}
