import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RegisterServiceService} from '../shared/services/register-service.service';
import {Registration} from '../shared/models/registration.model';
import {Login} from '../shared/models/login.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {

  login = new Login();
  msg = '';

  constructor(
    private  dialogRef: MatDialogRef<LoginPopupComponent>,
    private registerService: RegisterServiceService,
    // tslint:disable-next-line:variable-name
    private _route: Router,
    @Inject(MAT_DIALOG_DATA) public  data: any) { }



  ngOnInit(): void {
  }
  public  closeMe() {
    this.dialogRef.close();
  }

  loginStudent() {
     this.registerService.studentLogin(this.login).subscribe(
       data => {console.log('response received');
                this._route.navigate(['/home']);

                this.dialogRef.close();
       },
       error => {
         console.log('exception occured');
         this.msg = 'Bad Credentials, please enter valid username and password.';
       }
     );
  }

}
