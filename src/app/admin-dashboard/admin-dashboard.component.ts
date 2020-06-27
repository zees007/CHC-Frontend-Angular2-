import {Component, OnInit} from '@angular/core';
import {AdminDashboardService} from '../shared/services/admin-dashboard.service';
import {MatTableDataSource} from '@angular/material/table';
import {AddNewFacultyPopupComponent} from '../about/faculty/add-new-faculty-popup/add-new-faculty-popup.component';
import {MatDialog} from '@angular/material/dialog';
import {AddStudentPopUpComponent} from './add-student-pop-up/add-student-pop-up.component';
import {Registration} from '../shared/models/registration.model';
import {Admindashboard} from '../shared/models/admindashboard.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EditAdmindashboarddataComponent} from '../edit-admindashboarddata/edit-admindashboarddata.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {



  constructor(private adminDashBoardService: AdminDashboardService, public dialog: MatDialog) {
  }

  searchText: string;
  registrationsByAdmin: any = [];

  ngOnInit(): void {

    this.adminDashBoardService.refreshNeeded.subscribe(() => {
      this.getAllStudentsAddedByAdmin();
    });

    this.getAllStudentsAddedByAdmin();
  }


  private getAllStudentsAddedByAdmin() {
    this.adminDashBoardService.getAllStudentRegisteredByAdmin()
      .subscribe(result => this.registrationsByAdmin = result);
  }

  deleteRegisteredByAdmin(serial) {
    const index = this.registrationsByAdmin.map(x => x.studentName).indexOf(Admindashboard);
    return this.adminDashBoardService.retireStudentByAdmin(serial).subscribe(res => {
      this.registrationsByAdmin.splice(index, 1);
      console.log('Student deleted!');
      alert('Student Record has been deleted successfully..!');
    });
  }

  openAddStudentPopUP() {
    const dialogRef = this.dialog.open(AddStudentPopUpComponent, {
      width: '1500px',
      height: '510px'
      // data: items
    });
    dialogRef.afterClosed();
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed', result);
  }

  editRegistrationByAdmin(regisByAdmin) {
    this.adminDashBoardService.sendAdminDataObject(regisByAdmin);
    const dialogRef = this.dialog.open(EditAdmindashboarddataComponent, {
      width: '1500px',
      height: '510px'
    });
    // this.adminDashBoardService.populateEditForm(regisByAdmin);

    // if (serial) {
    //   this.adminDashBoardService.getOneRegistrationBySerial(serial).subscribe(
    //     (admindashboard: Admindashboard) => this.editStudentDetailByAdmin(admindashboard),
    //     (err: any) => console.log(err)
    //   );
    // }
  }

  // editStudentDetailByAdmin(admindashboard: Admindashboard) {
  //   this.adminDashBoardService.addStudentByAdminForm.patchValue({
  //     studentName: admindashboard.studentName,
  //     studentFatherName: admindashboard.studentFatherName,
  //     studentDob: admindashboard.studentDob,
  //     studentClass: admindashboard.studentSchoolName,
  //     studentSchoolName: admindashboard.studentSchoolName,
  //     studentContactNumber: admindashboard.studentContactNumber,
  //     studentEmail: admindashboard.studentEmail,
  //     studentAddress: admindashboard.studentAddress,
  //     feePaid: admindashboard.feePaid,
  //     feeBalance: admindashboard.feeBalance,
  //     studentImage: admindashboard.studentImage
  //   });
  // }

}


