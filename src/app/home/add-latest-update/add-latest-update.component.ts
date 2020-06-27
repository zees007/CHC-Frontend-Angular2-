import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Faculty} from '../../shared/models/faculty.model';
import {LatestUpdate} from '../../shared/models/latestUpdate.model';
import {LatestUpdateService} from '../../shared/services/latest-update.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-add-latest-update',
  templateUrl: './add-latest-update.component.html',
  styleUrls: ['./add-latest-update.component.scss']
})
export class AddLatestUpdateComponent implements OnInit {

  latestUpdateForm: FormGroup;
  latestUpdate: LatestUpdate = new LatestUpdate('' , '' , '');

  constructor(private latestUpdateService: LatestUpdateService,
              private dialog: MatDialog,
              private fb: FormBuilder) {

    this.latestUpdateForm = this.fb.group({
      heading: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('[.a-zA-z0-9 ]*'), Validators.minLength(3)])]),
      subHeading: new FormControl(''),
      latestNote: new FormControl('')
    });
  }

  ngOnInit(): void {
  }


  addLatestUpdate(item: FormGroup) {
    if (item.valid) {
      const adminDashboardFormData = item.value;
      console.log(adminDashboardFormData);
      // adminDashboardFormData.studentImage = {};
      // adminDashboardFormData.studentImage.id = this.imageId;
      // const formData = new FormData();
      // formData.append('adminDashboardFormData', adminDashboardFormData);
      this.latestUpdateService.createLatestUpdate(adminDashboardFormData).subscribe((response) => {
        console.log(response);
        this.dialog.closeAll();
      });
    }

  }
}
