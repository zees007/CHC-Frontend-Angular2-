import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject, throwError} from 'rxjs';
import {catchError, retry, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  // component refresh while adding new item via from submission
  // first create Subject observable and create get method like below
  // then use tab function in form submit post call
  // then call this refresh method via service in show component where we retrive getAll data
  private refreshNeeded$ = new Subject<void>();

  get refreshNeeded(){
    return this.refreshNeeded$;
  }

  constructor(public http: HttpClient) {this.http = http; }

  public saveTestimonial(testimonial) {

    return this.http.post('http://localhost:8080/testimonial/save', testimonial)
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();  // for refreshing the component
        }),
        retry(1),
        catchError(this.errorHandl)
      );

  }

  public getAllTestimonials(){
    return this.http.get('http://localhost:8080/testimonials');
  }

  public retireTestimonial(id){
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    };
    return this.http.post('http://localhost:8080/testimonial/delete/' + id, config)
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
