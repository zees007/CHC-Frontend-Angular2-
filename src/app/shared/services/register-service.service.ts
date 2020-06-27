import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Registration} from '../models/registration.model';
import {Login} from '../models/login.model';
import {catchError, map, retry, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AdminLogin} from '../models/adminLogin.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  // student related properties
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private fullname = new BehaviorSubject<string>(localStorage.getItem('fullname'));
  // admin related property
  private loggedIn = new BehaviorSubject<boolean>(false);

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

  public saveStudentRegisteration(registration): Observable<Registration> {

    return this.http.post<Registration>('http://localhost:8080/registration/save', registration, {responseType: 'text' as 'json'})
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();  // for refreshing the component
        }),
        retry(1),
        catchError(this.errorHandl)
      );

  }

  public getAllRegisteredStudentList() {
    return this.http.get('http://localhost:8080/registrations');
  }

  public retireStudent(id) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    };
    return this.http.post<Registration>('http://localhost:8080/registration/delete/' + id, config);

  }


  public studentLogin(login: Login): Observable<any> {
    return this.http.post<any>('http://localhost:8080/login', login).pipe(
      map(result => {
        if (result) {
          this.loginStatus.next(true);
          localStorage.setItem('loginStatus', '1');
          localStorage.setItem('fullname', result.fullname);
        }
      })
    );

  }


  logout() {
    this.loginStatus.next(false);
    localStorage.setItem('loginStatus', '0');
    localStorage.removeItem('fullname');
    console.log('Logged out successfully..!!');
  }

  checkLoginStatus(): boolean {
    return false;
  }

  get isLoggedIn() {
    return this.loginStatus.asObservable();
  }

  get currentfullName() {
    return this.fullname.asObservable();
  }

// admin panel login and logout

  get isAdminLoggedIn() {
    return this.loggedIn.asObservable();
  }

  loginAdmin(admin: AdminLogin) {
    if (admin.username === 'admin' && admin.password === 'admin') {
      this.loggedIn.next(true);
      this.router.navigate(['/administration']);
    } else {
      console.log('exception occured..!! username and password does not match');
    }
  }

  logoutAdmin() {
    this.loggedIn.next(false);
    this.router.navigate(['/adminlogin']);
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
