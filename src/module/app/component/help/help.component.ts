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
  constructor(
  ) {
  }

  ngOnInit(): void {
  }

}
