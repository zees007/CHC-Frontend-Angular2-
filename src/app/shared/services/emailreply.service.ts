import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {Faculty} from '../models/faculty.model';
import {catchError, retry, tap} from 'rxjs/operators';
import {EmailReply} from '../models/emailReply.model';

@Injectable({
  providedIn: 'root'
})
export class EmailreplyService {

  constructor(public http: HttpClient) {
    this.http = http;
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private refreshNeeded$ = new Subject<void>();

  get refreshNeeded() {
    return this.refreshNeeded$;
  }

  replyEmailOfQuery(data): Observable<EmailReply> {

    return this.http.post<EmailReply>('http://localhost:8080/sendEmail', data, this.httpOptions)
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();
        }),
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
