import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-gallerydialog',
  templateUrl: './add-gallerydialog.component.html',
  styleUrls: ['./add-gallerydialog.component.scss']
})
export class AddGallerydialogComponent implements OnInit {

  nestedReactiveForm: any = FormGroup;

  constructor(private fb: FormBuilder) {
    this.nestedReactiveForm = this.fb.group({
      userforms : this.fb.array([this.userForm()])
    });
  }

  ngOnInit(): void {
  }

  userForm(): FormGroup{
    return this.fb.group({
      eventTitle: [''],
      images: this.fb.array([])
    });
  }

  fileUpload(evt: any, index: any) {
    const files = evt.target.files;
    const control = this.nestedReactiveForm.controls.userforms.controls[index].controls.images.controls as FormArray;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < files.length; i++){
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = reader.result + '';
        control.push(this.fb.control(base64));
      };
      reader.readAsDataURL(files[i]);
    }
    evt.srcElement.value = null;

  }

  addNewForm() {
    const control = this.nestedReactiveForm.controls.userforms;
    control.push(this.userForm());
  }

  removeSelectedForm(i: number) {
    const control = this.nestedReactiveForm.controls.userforms;
    control.removeAt(i);
  }

  removeImage(formIndex: number, imageIndex: number) {
    const control = this.nestedReactiveForm.controls.userforms.controls[formIndex].controls.images as FormArray;
    control.removeAt(imageIndex);
  }

  save(usersfrom: any) {

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < usersfrom.userforms.length; i++){
      usersfrom.userforms[i].images = this.nestedReactiveForm.controls.userforms.controls[i].controls.images.controls;
      usersfrom.userforms[i].images = usersfrom.userforms[i].images.map(data => data.value);
    }
    console.log(usersfrom);
  }
}
