import { Injectable } from '@angular/core';
import {RegisterServiceService} from './register-service.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private registerService: RegisterServiceService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.registerService.isAdminLoggedIn
      .pipe(
        take(1),
        map((isAdminLoggedIn: boolean) => {
          if (!isAdminLoggedIn){
            this.router.navigate(['/adminlogin']);
            return false;
          }
          return true;
        })
      );
  }

}
