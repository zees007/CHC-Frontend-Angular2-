import { Injectable } from '@angular/core';
import {Subject, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, retry, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TutorialsService {

  // component refresh while adding new item via from submission
  // first create Subject observable and create get method like below
  // then use tab function in form submit post call
  // then call this refresh method via service in show component where we retrive getAll data
  private refreshNeeded$ = new Subject<void>();

  get refreshNeeded(){
    return this.refreshNeeded$;
  }

  constructor(public http: HttpClient) {this.http = http; }

  public saveTutorials(tutorial) {

    return this.http.post('http://localhost:8080/tutorial/save', tutorial)
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();  // for refreshing the component
        }),
        retry(1),
        catchError(this.errorHandl)
      );

  }

  public getAllTutorials(){
    return this.http.get('http://localhost:8080/tutorials');
  }


  public deleteTutorials(id){
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    };
    return this.http.delete('http://localhost:8080/tutorial/delete/' + id, config)
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
