import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Faculty} from '../../../shared/models/faculty.model';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {File} from '../../../shared/models/file.model';
import {FileService} from '../../../shared/services/file.service';
import {FacultyService} from '../../../shared/services/faculty.service';

@Component({
  selector: 'app-add-new-faculty-popup',
  templateUrl: './add-new-faculty-popup.component.html',
  styleUrls: ['./add-new-faculty-popup.component.scss']
})
export class AddNewFacultyPopupComponent implements OnInit {

  reactiveForm: any = FormGroup;
  picForm: any = FormGroup;
  public userProfile: any = File;
  imageId;

  faculty: Faculty = new Faculty('' , '' , '' , null);
  @Output() formSubmit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();



  constructor( public dialog: MatDialog, private fb: FormBuilder, private facultyService: FacultyService, private fileService: FileService) {
    this.reactiveForm = this.fb.group({
      facultyName: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('[.a-zA-z ]*'), Validators.minLength(3)])]),
      facultyEducation: new FormControl(''),
      facultySubject: new FormControl(''),
      facultyImage: this.imageId
    });

  }

  ngOnInit(): void {
  }


  // addNewFacultyForm(submitForm: FormGroup) {
  //   if (submitForm.valid) {
  //       const facultyFormData = submitForm.value;
  //       console.log(facultyFormData);
  //       facultyFormData.facultyImage = {};
  //       facultyFormData.facultyImage.id = this.imageId;
  //       const formData = new FormData();
  //       formData.append('facultyFormData', facultyFormData);
  //       this.facultyService.addNewFaculty(facultyFormData).subscribe((response) => {
  //         console.log(response);
  //         this.dialog.closeAll();
  //         // window.location.reload();
  //       });
  //   }
  // }


  addNewFacultyForm() {
    if (this.reactiveForm.valid) {
      const facultyFormData = this.reactiveForm.value;
      console.log(facultyFormData);
      facultyFormData.facultyImage = {};
      facultyFormData.facultyImage.id = this.imageId;
      const formData = new FormData();
      formData.append('facultyFormData', facultyFormData);
      this.facultyService.addNewFaculty(facultyFormData).subscribe((response) => {
        console.log(response);
        this.dialog.closeAll();
        // alert('New Faculty has been added...!');
        // window.location.reload();
      });
    }
  }

  onSelectFile(event) {
    const file = event.target.files[0];
    console.log(file);
    this.userProfile = file;
  }

  uploadFile(submitForm: FormGroup) {
    // const pic = this.picForm.get('facultyImage').value;
    const formData = new FormData();
    formData.append('file', this.userProfile);
    this.fileService.saveFile(formData).subscribe((res) => {
      console.log(res);
      // const responseJSON = JSON.parse(res);
      this.imageId = res.id;
      console.log(this.imageId);
    });
  }
}
