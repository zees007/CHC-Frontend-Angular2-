import { Component, OnInit } from '@angular/core';
import {RegisterServiceService} from '../shared/services/register-service.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  adminLoginStatus$: Observable<boolean>;

  constructor(private registerService: RegisterServiceService) { }

  ngOnInit(): void {
    this.adminLoginStatus$ = this.registerService.isAdminLoggedIn;
  }

  onAdminLogout() {
    this.registerService.logoutAdmin();
  }
}
