import { Component, OnInit } from '@angular/core';
import {File} from '../shared/models/file.model';
import {FileService} from '../shared/services/file.service';
import {TestimonialService} from '../shared/services/testimonial.service';
import {Testimonial} from '../shared/models/testimonial.model';
import {Registration} from '../shared/models/registration.model';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-add-testimonial-popup',
  templateUrl: './add-testimonial-popup.component.html',
  styleUrls: ['./add-testimonial-popup.component.scss']
})
export class AddTestimonialPopupComponent implements OnInit {

  reactiveForm: any = FormGroup;
  public userProfile: any = File;
  imageId;

  testimonial: Testimonial = new Testimonial('' , '' , '' , '' , null );
  constructor(public dialog: MatDialog, public fb: FormBuilder, private fileService: FileService, private testimonialService: TestimonialService) {

    this.reactiveForm = this.fb.group({
      studentName: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('[.a-zA-z ]*'), Validators.minLength(3)])]),
      studentCurrentStatus: new FormControl(''),
      studentFeedback: new FormControl(''),
      studentBatch: new FormControl(''),
      studentImage: this.imageId
    });

  }

  ngOnInit(): void {
  }

  onSelectFile(event) {
    const file = event.target.files[0];
    console.log(file);
    this.userProfile = file;
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.userProfile);
    this.fileService.saveFile(formData).subscribe((res) => {
      console.log(res);
      // const responseJSON = JSON.parse(res);
      this.imageId = res.id;
      console.log(this.imageId);
    });
  }


  saveNewTestimonial(submitForm: FormGroup) {
    if (submitForm.valid) {
      const testimonialFormData = submitForm.value;
      console.log(testimonialFormData);
      testimonialFormData.studentImage = {};
      testimonialFormData.studentImage.id = this.imageId;
      const formData = new FormData();
      formData.append('testimonialFormData', testimonialFormData);
      this.testimonialService.saveTestimonial(testimonialFormData).subscribe((response) => {
        console.log(response);
        this.dialog.closeAll();
      });
    }

  }
}
