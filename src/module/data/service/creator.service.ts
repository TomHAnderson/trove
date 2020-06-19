import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Creator } from '../types/creator';
import { HalCreator } from '../types/hal-creator';

@Injectable({
  providedIn: 'root'
})
export class CreatorService {

  constructor(
    private http: HttpClient
  ) { }

  public lookup(term: string): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/internet-archive/creator-lookup?search=${term}`);
  }

  public find(id: number): Observable<Creator> {
    return this.http.get<Creator>(`${environment.apiUrl}/internet-archive/creator/${id}`);
  }

  public findByName(name: string): Observable<Creator> {
    const params = {
      filter: [
        {
          type: 'eq',
          field: 'name',
          value: name
        }
      ],
      limit: 1
    };

    return this.http.get<HalCreator>(`${environment.apiUrl}/internet-archive/creator?` + $.param(params))
      .pipe(
        map(halCreator => {
          if (halCreator._embedded.creator.length) {
            return halCreator._embedded.creator[0];
          }

          return null;
        })
      );
  }
}
