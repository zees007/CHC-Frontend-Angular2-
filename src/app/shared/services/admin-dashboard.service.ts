import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, retry, tap} from 'rxjs/operators';
import {Admindashboard} from '../models/admindashboard.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  private SearchSerialUrl = 'http://localhost:8080/student/search';
  constructor(public http: HttpClient, private fb: FormBuilder) {

  }

  get refreshNeeded() {
    return this.refreshNeeded$;
  }

  editStudentAdminForm: FormGroup = this.fb.group({
    serial: new FormControl(null),
    registeredDate: new FormControl(''),
    studentName: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('[.a-zA-z ]*'), Validators.minLength(3)])]),
    studentFatherName: new FormControl(''),
    studentDob: new FormControl(''),
    studentClass: new FormControl(''),
    studentSchoolName: new FormControl(''),
    studentContactNumber: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
    studentEmail: new FormControl(''),
    studentAddress: new FormControl(''),
    feePaid: new FormControl(''),
    feeBalance: new FormControl(''),
    studentImage: new FormControl(null)
  });


  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  private refreshNeeded$ = new Subject<void>();

  private subject = new BehaviorSubject(null);
  currentMessage = this.subject.asObservable();

  private eligibility = new BehaviorSubject(null);
  currentEligibility = this.subject.asObservable();

  setEligibilityStatus(status: boolean) {
    this.subject.next(status);
  }

  getEligibilityStatus(): Observable<any> {
    return this.subject.asObservable();
  }


  sendAdminDataObject(admindashboard: Admindashboard) {
    this.subject.next(admindashboard);
  }

  getAdminDataObject(): Observable<any> {
    return this.subject.asObservable();
  }

  newStudentAddedByAdmin(data): Observable<Admindashboard> {

    return this.http.post<Admindashboard>('http://localhost:8080/registrationByAdmin/save', JSON.stringify(data), this.httpOptions)
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();
        }),
        retry(1),
        catchError(this.errorHandl)
      );
  }

  editStudentRegistrationByAdmin(data): Observable<Admindashboard> {

    return this.http.post<Admindashboard>('http://localhost:8080/registrationByAdmin/save', JSON.stringify(data), this.httpOptions)
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();
        }),
        retry(1),
        catchError(this.errorHandl)
      );
  }

  public getAllStudentRegisteredByAdmin(): Observable<Admindashboard> {
    return this.http.get<Admindashboard>('http://localhost:8080/allRegistrationsByAdmin')
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  // For validation of serial number in registration
  public getAllSerialByAdminAdded(): Observable<Admindashboard[]> {
    return this.http.get<Admindashboard[]>('http://localhost:8080/allRegistrationsByAdmin')
      .pipe(
        map(users => {
          const newUsers = [];
          for (const user of users){
            const serial = user.serial;
            newUsers.push({ serial});
          }
          return newUsers;
        } ),
        tap(users => console.log(users))
      );
  }

  getStudentBySerialAddedByAdmin(serial: string){
    // return this.http.get<any[]>('${this.SearchSerialUrl}?enroll=${serial}');
    return this.http.get<any[]>('http://localhost:8080/student/search?enroll=' + serial );
  }



  public retireStudentByAdmin(serial) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    };
    return this.http.post('http://localhost:8080/registrationByAdmin/delete/' + serial, config)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  public getOneRegistrationBySerial(serial): Observable<Admindashboard> {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    };
    return this.http.get<Admindashboard>('http://localhost:8080/getOne/registrationByAdmin/' + serial, config)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  populateEditForm(admindashboard) {
    this.editStudentAdminForm.setValue(admindashboard);
    console.log(admindashboard);
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

