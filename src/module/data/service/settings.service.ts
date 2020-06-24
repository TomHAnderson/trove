import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings;

  constructor(
    private database: DatabaseService
  ) {
    this.database.getItem('settings').subscribe(settings => {
      if (! settings) {
        this.settings = {};
        this.database.setItem('settings', this.settings);
      } else {
        this.settings = settings;
      }
    });
  }

  public get() {
    if (this.settings) {
      return of(this.settings);
    } else {
      return from(this.database.getItem('settings'));
    }
  }

  public set(settings) {
    this.settings = settings;
    this.database.setItem('settings', settings);
  }
}
