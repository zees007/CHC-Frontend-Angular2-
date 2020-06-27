import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Admindashboard} from '../shared/models/admindashboard.model';
import {AdminDashboardService} from '../shared/services/admin-dashboard.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {File} from '../shared/models/file.model';
import {FileService} from '../shared/services/file.service';

@Component({
  selector: 'app-edit-admindashboarddata',
  templateUrl: './edit-admindashboarddata.component.html',
  styleUrls: ['./edit-admindashboarddata.component.scss']
})
export class EditAdmindashboarddataComponent implements OnInit {

  editStudentByAdminForm: FormGroup;
  editData;
  subscription: Subscription;
  selectedEmail;
  public studentPic: any = File;
  imageId;

  constructor(private dialog: MatDialog, private adminDashboardService: AdminDashboardService, private fb: FormBuilder, private fileService: FileService) {
    this.editStudentByAdminForm = this.fb.group({
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
    this.subscription = this.adminDashboardService.getAdminDataObject().subscribe(editData => this.selectedEmail = editData);
    console.log(this.selectedEmail.serial);
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


  submitUpdatedStudentForm(submitForm: FormGroup) {
    if (submitForm.valid) {
      const adminDashboardFormData = submitForm.value;
      console.log(adminDashboardFormData);
      adminDashboardFormData.studentImage = {};
      adminDashboardFormData.studentImage.id = this.imageId;
      const formData = new FormData();
      formData.append('adminDashboardFormData', adminDashboardFormData);
      this.adminDashboardService.editStudentRegistrationByAdmin(adminDashboardFormData).subscribe((response) => {
        console.log(response);
        this.dialog.closeAll();
      });
    }
  }
}
