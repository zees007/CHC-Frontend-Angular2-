import {Directive} from '@angular/core';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {AdminDashboardService} from '../services/admin-dashboard.service';
import {map} from 'rxjs/operators';

@Directive({
  selector: '[appUniqueSerial]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueSerialValidatorDirective, multi: true}]
})
export class UniqueSerialValidatorDirective implements AsyncValidator {

  constructor(private adminDashboardService: AdminDashboardService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.adminDashboardService.getStudentBySerialAddedByAdmin(control.value).pipe(
      map(users => {
        return users && users.length > 0 ? {appUniqueSerial: true} : null;
      })
    );
  }

}
