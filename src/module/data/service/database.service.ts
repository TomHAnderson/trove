import { Injectable } from '@angular/core';
import { createInstance, WEBSQL, INDEXEDDB, LOCALSTORAGE } from 'localforage';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { from, Observable } from 'rxjs';

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

  public setItem(key, value): Observable<any> {
    return from(this.database.setItem(key, value));
  }

  public getItem(key): Observable<any> {
    return from(this.database.getItem(key));
  }

  public removeItem(key): Observable<any> {
    return from(this.database.removeItem(key));
  }

  public keys(): Observable<any> {
    return from(this.database.keys());
  }
}
