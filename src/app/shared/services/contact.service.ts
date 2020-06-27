import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, retry, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {Contact} from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  get refreshNeeded() {
    return this.refreshNeeded$;
  }

  constructor(public http: HttpClient) {
    this.http = http;
  }


  private refreshNeeded$ = new Subject<void>();

  private subject = new BehaviorSubject('');
  currentMessage = this.subject.asObservable();

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  sendMessage(message: string) {
    this.subject.next(message);
  }


  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  postMessage(input: any) {
    return this.http.post('https://mailthis.to/chc02', input, {responseType: 'text'}).pipe(
      map(
        (response) => {
          if (response) {
            return response;
          }
        },
        (error: any) => {
          return error;
        }
      )
    );
  }

  submitQueryForm(data): Observable<Contact> {
    return this.http.post<Contact>('http://localhost:8080/contactusMessage/save', data, this.httpOptions)
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();
        }),
        retry(1),
        catchError(this.errorHandl)
      );
  }

  public getAllMessages(): Observable<Contact> {
    return this.http.get<Contact>('http://localhost:8080/contactusMessages')
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  public retireMessageContact(id) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    };
    return this.http.post('http://localhost:8080/contactusMessage/delete/' + id, config)
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
