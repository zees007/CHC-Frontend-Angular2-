import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, retry, tap} from 'rxjs/operators';
import {Observable, Subject, Subscription, throwError} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {Gallary} from '../models/gallary.model';
import {Registration} from '../models/registration.model';

@Injectable({
  providedIn: 'root'
})
export class GallaryService {

  // component refresh while adding new item via from submission
  // first create Subject observable and create get method like below
  // then use tab function in form submit post call
  // then call this refresh method via service in show component where we retrive getAll data
  private refreshNeeded$ = new Subject<void>();

  get refreshNeeded(){
    return this.refreshNeeded$;
  }


  constructor(public http: HttpClient, private router: Router) {
    this.http = http;
  }



  saveGallaryForm(data): Observable<Gallary>{
    return this.http.post<Gallary>('http://localhost:8080/gallary/save', data)
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();  // for refreshing the component
        }),
        retry(1),
        catchError(this.errorHandl)
      );
  }

  public getAllGalleryItems(): Observable<Gallary[]>{
    return this.http.get<Gallary[]>('http://localhost:8080/gallaries');
  }

  public retireGallery(id) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    };
    return this.http.post<Gallary>('http://localhost:8080/gallary/delete/' + id, config);
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
