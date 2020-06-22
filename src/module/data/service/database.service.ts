import { Injectable } from '@angular/core';
import { createInstance, WEBSQL, INDEXEDDB, LOCALSTORAGE } from 'localforage';
import { from, Observable } from 'rxjs';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: any;

  constructor() {
    // Configure LocalForage
    this.database = createInstance({
      driver: [
        WEBSQL,
        INDEXEDDB,
        LOCALSTORAGE
      ],
      name: 'Trove'
    });
  }

  public getItem(key): Observable<any> {
    return from(this.database.getItem(key));
  }

  public setItem(key, value): Observable<any> {
    return from(this.database.setItem(key, value));
  }

  public removeItem(key): Observable<any> {
    return from(this.database.removeItem(key));
  }

  public keys(): Observable<any> {
    return from(this.database.keys());
  }
}
