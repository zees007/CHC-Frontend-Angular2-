import {Component, Input, OnInit} from '@angular/core';
import {Registration} from '../../shared/models/registration.model';
import {RegisterServiceService} from '../../shared/services/register-service.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  searchText: string;
  registrations: any = [];
  constructor(private registerService: RegisterServiceService) { }

  ngOnInit(): void {

    this.registerService.refreshNeeded.subscribe(() => {
      this.getAllRegistrationOfStudents();
    });

    this.getAllRegistrationOfStudents();
  }

  private getAllRegistrationOfStudents(){
    const resp = this.registerService.getAllRegisteredStudentList();
    resp.subscribe((data) => this.registrations = data);
  }

  // @ts-ignore
  // public deleteRegisteredStudent(id: number): Observable<Registrations[]>{
  //
  //   const resp = this.registerService.retireStudent(id);
  //   resp.subscribe((data) => this.registrations = data);
  //   alert('Record has been deleted successfully..!')
  //   console.log(this.registrations);
  //   // window.location.reload();
  //
  // }


  deleteRegisteredStudent(id){
    const index  = this.registrations.map(x => x.studentName).indexOf(Registration);
    return this.registerService.retireStudent(id).subscribe(res => {
      this.registrations.splice(index, 1);
      console.log('Student deleted!');
      alert('Student Record has been deleted successfully..!');
    });
  }

}
