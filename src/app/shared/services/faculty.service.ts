import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {Faculty} from '../models/faculty.model';
import {catchError, retry, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  private refreshNeeded$ = new Subject<void>();

  get refreshNeeded(){
    return this.refreshNeeded$;
  }

  constructor(public http: HttpClient) {
    this.http = http;
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  addNewFaculty(data): Observable<Faculty> {

    return this.http.post<Faculty>('http://localhost:8080/faculty/save', JSON.stringify(data), this.httpOptions)
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();
        }),
        retry(1),
        catchError(this.errorHandl)
      );

  }

  public getAllFaculty(): Observable<Faculty> {
    return this.http.get<Faculty>('http://localhost:8080/faculties')
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  public retireFaculty(id){
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    };
    return this.http.post('http://localhost:8080/faculty/delete/' + id, config)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
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
