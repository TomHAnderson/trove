import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Trove';
  public version: string;

  constructor(
    private titleService: Title,
  ) {
    // Get version
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        this.version = xmlhttp.responseText;
      }
    };

    xmlhttp.open('GET', '/assets/version.txt', false );
    xmlhttp.send();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
