import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CreatorService } from '@module/data/service/creator.service';
import { Creator } from '@module/data/types/creator';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit {
  public creator: Creator;
  public currentYear = 2020;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private creatorService: CreatorService
  ) {
    this.route.params.subscribe(params => {
      this.creatorService.find(params.id).subscribe(creator => {
        this.creator = creator;
        this.titleService.setTitle(creator.name);
      });
    });
  }

  ngOnInit(): void {

  }

  public search(year) {
    this.currentYear = year;
  }

}
