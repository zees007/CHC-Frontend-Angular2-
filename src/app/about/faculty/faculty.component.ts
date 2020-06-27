import {Component, Inject, Input, OnInit} from '@angular/core';
import {AddNewFacultyPopupComponent} from './add-new-faculty-popup/add-new-faculty-popup.component';
import {FormGroup} from '@angular/forms';
import {FileService} from '../../shared/services/file.service';
import {FacultyService} from '../../shared/services/faculty.service';
import {MatDialog} from '@angular/material/dialog';
import {RegisterServiceService} from '../../shared/services/register-service.service';
import {Observable} from 'rxjs';
import {Faculty} from '../../shared/models/faculty.model';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {

  adminLoginStatus$: Observable<boolean>;
  public faculty: any = [];
  @Input() reactiveForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private facultyService: FacultyService,
    private fileService: FileService,
    private registerService: RegisterServiceService) {}



  ngOnInit(): void {

    // for hiding the faculty delete/add icon. only visible to admin login
    this.adminLoginStatus$ = this.registerService.isAdminLoggedIn;

    this.facultyService.refreshNeeded.subscribe(() => {
      this.getAllFaculties();
    });

    this.getAllFaculties();
  }

  private getAllFaculties(){
    const resp = this.facultyService.getAllFaculty();
    // resp.subscribe((data) => this.faculty = data);
    resp.subscribe((data: {}) => {
      this.faculty = data;
    });
  }

  // public deleteFaculty(id: number){
  //   const resp = this.facultyService.retireFaculty(id);
  //   resp.subscribe((data) => this.faculty = data);
  //   console.log(this.faculty);
  //   window.location.reload();
  // }

  deleteFaculty(data){
    const index = this.faculty.map(x => x.id).indexOf(data.id);
    return this.facultyService.retireFaculty(data.id).subscribe(res => {
      this.faculty.splice(index, 1);
      console.log('Faculty deleted!');
      alert('Faculty Deleted successfully..!');
    });
  }


  openFacultyDialog() {
    const dialogRef = this.dialog.open(AddNewFacultyPopupComponent, {
      width: '250px',
      // data: items
    });
    dialogRef.afterClosed();
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed', result);
  }


}
