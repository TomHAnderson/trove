import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creator-list',
  templateUrl: './creator-list.component.html',
  styleUrls: ['./creator-list.component.scss']
})
export class CreatorListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  alphabet(): Array<string> {
    const alphabet: string[] = [];

    for (let i = 65; i <= 90; i++) {
      alphabet.push(String.fromCharCode(i));
    }

    return alphabet;
  }
}
