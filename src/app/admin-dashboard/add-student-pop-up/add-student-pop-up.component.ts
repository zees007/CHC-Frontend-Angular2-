import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Admindashboard} from '../../shared/models/admindashboard.model';
import {File} from '../../shared/models/file.model';
import {FileService} from '../../shared/services/file.service';
import {AdminDashboardService} from '../../shared/services/admin-dashboard.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-add-student-pop-up',
  templateUrl: './add-student-pop-up.component.html',
  styleUrls: ['./add-student-pop-up.component.scss']
})
export class AddStudentPopUpComponent implements OnInit {

  addStudentByAdminForm: any = FormGroup;
  public studentPic: any = File;
  imageId;
  adminDashBoard: Admindashboard = new Admindashboard(null, null, '', '', '', '', '', '', '', '', '', '', null);
  eligibilityStatus = false;

  constructor(public dialog: MatDialog, private fb: FormBuilder, private fileService: FileService, private adminDashboardService: AdminDashboardService)
  {
    this.addStudentByAdminForm = this.fb.group({
      serial: new FormControl(null),
      registeredDate: new FormControl(null),
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
      studentImage: this.imageId
    });
  }

  ngOnInit(): void {
  }

  onSelectFile(event) {
    const file = event.target.files[0];
    console.log(file);
    this.studentPic = file;
    const formData = new FormData();
    formData.append('file', this.studentPic);
    this.fileService.saveFile(formData).subscribe((res) => {
      console.log(res);
      // const responseJSON = JSON.parse(res);
      this.imageId = res.id;
      console.log(this.imageId);
    });
  }


  addStudentByAdmin(submitForm: FormGroup) {
    if (submitForm.valid) {

      this.eligibilityStatus = true;
      const adminDashboardFormData = submitForm.value;
      adminDashboardFormData.studentImage = {};
      adminDashboardFormData.studentImage.id = this.imageId;
      const formData = new FormData();
      formData.append('adminDashboardFormData', adminDashboardFormData);
      this.adminDashboardService.newStudentAddedByAdmin(adminDashboardFormData).subscribe((response) => {
        console.log(response);
        // this.credentials.studentContactNumber = response.studentContactNumber;
        // this.credentials.studentEmail = response.studentEmail;
        // this.credentials.isEnrolled = true;
        this.adminDashboardService.setEligibilityStatus(this.eligibilityStatus);
       // console.log(this.credentials)
        this.dialog.closeAll();
});
}

}


}
