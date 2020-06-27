import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, retry, tap} from 'rxjs/operators';
import {LatestUpdate} from '../models/latestUpdate.model';
import {Registration} from '../models/registration.model';



@Injectable({
  providedIn: 'root'
})
export class LatestUpdateService {

  // component refresh while adding new item via from submission
  // first create Subject observable and create get method like below
  // then use tab function in form submit post call
  // then call this refresh method via service in show component where we retrive getAll data
  private refreshNeeded$ = new Subject<void>();

  get refreshNeeded(){
    return this.refreshNeeded$;
  }

  constructor(public http: HttpClient) {
    this.http = http;
  }

  createLatestUpdate(data): Observable<LatestUpdate>{
    return this.http.post<LatestUpdate>('http://localhost:8080/latestUpdate/save', data)
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();  // for refreshing the component
        }),
        retry(1),
        catchError(this.errorHandl)
      );
  }

  public getAllLatestUpdateList(): Observable<LatestUpdate> {
    return this.http.get<LatestUpdate>('http://localhost:8080/latestUpdates')
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  public retireLatestUpdate(id) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    };
    return this.http.delete<Registration>('http://localhost:8080/latestUpdate/delete/' + id, config);
  }
  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


}
