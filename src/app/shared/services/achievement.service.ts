import { Injectable } from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, retry, tap} from 'rxjs/operators';
import {Achievement} from '../models/Achievement.model';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {

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

  addNewAchievement(data): Observable<Achievement> {

    return this.http.post<Achievement>('http://localhost:8080/achievement/save', JSON.stringify(data), this.httpOptions)
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();
        }),
        retry(1),
        catchError(this.errorHandl)
      );

  }

  public getAchievements(): Observable<Achievement> {
    return this.http.get<Achievement>('http://localhost:8080/achievements')
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  public retireAchievement(id){
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    };
    return this.http.post('http://localhost:8080/achievement/delete/' + id, config)
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
