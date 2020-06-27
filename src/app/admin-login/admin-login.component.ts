import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterServiceService} from '../shared/services/register-service.service';
import {Login} from '../shared/models/login.model';
import {AdminLogin} from '../shared/models/adminLogin.model';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  // {1}
  private formSubmitAttempt: boolean;
  adminlogin = new AdminLogin();
  msg = '';

  constructor(private fb: FormBuilder, private registerService: RegisterServiceService) {

  }

  ngOnInit(): void {

  }


  onAdminLogin() {

    if (this.adminlogin) {
      this.registerService.loginAdmin(this.adminlogin);
      this.msg = 'Bad Credentials, please enter valid username and password.';
    }
    this.formSubmitAttempt = true;
  }

}
