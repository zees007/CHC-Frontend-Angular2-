import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Tutorial} from '../../shared/models/tutorial.model';
import {TutorialsService} from '../../shared/services/tutorials.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-add-tutorials-popup',
  templateUrl: './add-tutorials-popup.component.html',
  styleUrls: ['./add-tutorials-popup.component.scss']
})
export class AddTutorialsPopupComponent implements OnInit {

  tutorialForm: FormGroup;
  tutorial: Tutorial = new Tutorial('', '');
  constructor(
    private fb: FormBuilder,
    private tutorialsService: TutorialsService,
    private dialog: MatDialog) {

    this.tutorialForm = this.fb.group({
      videoTitle: new FormControl('', [Validators.required]),
      videoIdUrl: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  submitTutorialForm(submitForm: FormGroup) {
    if (submitForm.valid) {
      const tutorialsFormData = submitForm.value;
      console.log(tutorialsFormData);
      const formData = new FormData();
      formData.append('tutorialsFormData', tutorialsFormData);
      this.tutorialsService.saveTutorials(tutorialsFormData).subscribe((response) => {
        console.log(response);
        this.dialog.closeAll();
      });
    }
  }


}
