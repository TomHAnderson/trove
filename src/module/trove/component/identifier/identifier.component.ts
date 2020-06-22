import { Component, OnInit } from '@angular/core';
import { Title, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IdentifierService } from '@module/data/service/identifier.service';
import { Identifier } from '@module/data/types/identifier';
import * as localforage from 'localforage';
import { from } from 'rxjs';

@Component({
  selector: 'app-identifier',
  templateUrl: './identifier.component.html',
  styleUrls: ['./identifier.component.scss']
})
export class IdentifierComponent implements OnInit {
  public identifier: Identifier;
  public embedUrl: SafeResourceUrl;
  public showDescription = false;
  public isFavorite = false;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private identifierService: IdentifierService,
    public sanitizer: DomSanitizer,
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
          from(localforage.getItem(storageIdentifier))
            .subscribe(result => this.isFavorite = Boolean(result));

          this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            'https://archive.org/embed/' + identifier.archiveIdentifier + '?playlist=1&list_height=800'
          );

          console.log(this.embedUrl);

          this.identifier = identifier;
        });
    });
  }

  ngOnInit(): void {
  }

  public toggleFavorite() {
    const identifier = 'identifier_' + this.identifier.id;

    from(localforage.getItem(identifier)).subscribe(result => {
      if (result) {
        localforage.removeItem(identifier);
        this.isFavorite = false;
      } else {
        localforage.setItem(identifier, this.identifier);
        this.isFavorite = true;
      }
    });
  }

}
