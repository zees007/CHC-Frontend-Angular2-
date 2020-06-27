import { Component, OnInit } from '@angular/core';
import {LoginPopupComponent} from '../login-popup/login-popup.component';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {RegisterServiceService} from '../shared/services/register-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginStatus$: Observable<boolean>;
  fullname: Observable<string>;

  constructor(public dialog: MatDialog, public registerService: RegisterServiceService) { }

  ngOnInit(): void {
    this.loginStatus$ = this.registerService.isLoggedIn;
    this.fullname = this.registerService.currentfullName;

  }

  onLogout(){
    this.registerService.logout();
  }

  openLoginPopUp() {
    const dialogRef = this.dialog.open(LoginPopupComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result){
        // this.popUpData[this.popUpData.indexOf(loginData)] = result;
      }
    });
  }
}
