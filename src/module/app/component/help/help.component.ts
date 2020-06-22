import { Component, OnInit } from '@angular/core';
import { Identifier } from '@module/data/types/identifier';
import { DatabaseService } from '@module/data/service/database.service';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  public bookmark: Identifier;
  private bookmarkTimer: Observable<any>;

  constructor(
    private databaseService: DatabaseService
  ) {
    this.bookmarkTimer = timer(1500, 1500);
    this.bookmarkTimer.subscribe(time => {
      this.databaseService.getItem('bookmark')
        .subscribe(identifier => this.bookmark = identifier);
    });
  }

  ngOnInit(): void {
  }

}
