import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {FileService} from '../../shared/services/file.service';
import {Faculty} from '../../shared/models/faculty.model';
import {Achievement} from '../../shared/models/Achievement.model';
import {AchievementService} from '../../shared/services/achievement.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-add-achievement-popup',
  templateUrl: './add-achievement-popup.component.html',
  styleUrls: ['./add-achievement-popup.component.scss']
})
export class AddAchievementPopupComponent implements OnInit {

  achievementForm: any = FormGroup;
  imageId;
  achievementParaPoint = [];
  achievement: Achievement = new Achievement('', '', null);


  constructor(
    private fb: FormBuilder,
    private fileService: FileService,
    private achievmentService: AchievementService,
    private dialog: MatDialog
  ) {
    this.achievementForm = this.fb.group({
      achievementYearHeading: new FormControl(''),
      achievementImage: this.imageId,
      achievementScores: this.fb.array([this.userForm()])
    });

  }

  ngOnInit(): void {
  }

  userForm(): FormGroup {
    return this.fb.group({
      achievementPara: ['']
    });
  }

  fileUpload(event) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append('file', image);
      this.fileService.saveFile(formData).subscribe(
        res => {
          console.log(res);
          if (res) {
            this.imageId = res.id;
          }
        }
      );
    }

  }

  removeSelectedForm(i: number) {
    const control = this.achievementForm.controls.achievementScores;
    control.removeAt(i);
  }

  addNewForm() {
    const control = this.achievementForm.controls.achievementScores;
    control.push(this.userForm());

    // Above and below both logic works for adding new form controls
    // const ctr = this.achievementForm.get('achievementScores') as FormArray;
    // ctr.push(this.userForm());
  }


  addNewAchievement() {

    if (this.achievementForm.valid) {
      const achievementFormData = this.achievementForm.value;

      achievementFormData.achievementImage = {};
      achievementFormData.achievementImage.id = this.imageId;

      const formData = new FormData();
      formData.append('achievementFormData', achievementFormData);
      this.achievmentService.addNewAchievement(achievementFormData).subscribe((response) => {
        console.log(response);
        this.dialog.closeAll();
      });
    }
  }


}
