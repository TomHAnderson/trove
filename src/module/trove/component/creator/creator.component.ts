import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatorService } from '@module/data/service/creator.service';
import { Creator } from '@module/data/types/creator';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdentifierService } from '@module/data/service/identifier.service';
import { Location } from '@angular/common';
import { PerformanceDateVenueCoverageResult } from '@module/data/types/performance-date-venue-coverage-result';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit {
  public creator: Creator;
  public currentYear: number;
  public year: Subject<number>;
  public performanceDateVenueCoverageResult: PerformanceDateVenueCoverageResult;
  public noYears = false;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private creatorService: CreatorService,
    private identifierService: IdentifierService,
    private location: Location,
  ) {
    this.year = new Subject();

    this.year.subscribe(year => {
      this.identifierService.findByYear(this.creator.id, year)
        .pipe(map(performanceDateVenueCoverageResult => {
          this.location.go('/trove/creator/' + this.creator.id, '?year=' + year);
          this.titleService.setTitle(this.creator.name + ' · ' + year);
          this.currentYear = year;

          return performanceDateVenueCoverageResult;
        }))
        .subscribe(performanceDateVenueCoverageResult => {
          this.performanceDateVenueCoverageResult = performanceDateVenueCoverageResult;
        });
    });

    this.route.params.subscribe(params => {
      this.creatorService.find(params.id).subscribe(creator => {
        this.creator = creator;

        this.route.queryParams.subscribe(qparams => {
          let currentYear = qparams.year;

          if (! currentYear || currentYear === 'undefined') {
            if (! creator._computed.years.length) {
              this.noYears = true;
              return;
            }

            currentYear = creator._computed.years[creator._computed.years.length - 1];
          }

          this.year.next(currentYear);
        });
       });
     });
  }

  public ngOnInit() {
  }

  public search(year) {
    this.currentYear = year;
    this.year.next(this.currentYear);
  }

  public dateDetail(performanceDate) {
    this.router.navigate(['/trove/creator-identifier-performance-date',  this.creator.id, performanceDate]);
  }
}
