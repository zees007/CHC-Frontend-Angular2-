import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {GallaryService} from '../../shared/services/gallary.service';
import {FileService} from '../../shared/services/file.service';
import {MatDialog} from '@angular/material/dialog';
import {Faculty} from '../../shared/models/faculty.model';
import {Gallary} from '../../shared/models/gallary.model';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-add-gallary-pop-up',
  templateUrl: './add-gallary-pop-up.component.html',
  styleUrls: ['./add-gallary-pop-up.component.scss']
})
export class AddGallaryPopUpComponent implements  OnInit {

  gallaryForm: FormGroup;
  error: string;
  uploadError: string;
  imageId;
  images = [];



  @ViewChild('image') private image: ElementRef;

  galleryData: Gallary = new Gallary('' , null);


  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private gallaryService: GallaryService,
              private fileService: FileService,
              private renderer: Renderer2,
              private dialog: MatDialog,
              private router: Router)
  {
    this.gallaryForm = this.fb.group({
      eventTitle: new FormControl('', [Validators.required, Validators.minLength(3)]),
      image: this.fb.array([])

    });
  }

  ngOnInit() {
  }



  // initSocialProfiles() {
  //   return this.fb.group({
  //     id: ['']
  //   });
  // }

  // addGallaryImages() {
  //   console.log(this.gallaryForm);
  //   // tslint:disable-next-line:forin
  //   for (const entry in this.gallaryForm) {
  //     console.table(entry);
  //     const control = this.gallaryForm.controls.image as FormArray;
  //     const addrCtrl = this.initSocialProfiles();
  //     control.push(addrCtrl);
  //     console.log(addrCtrl);
  //   }
  // }


  galleryFormSubmit() {
    if (this.gallaryForm.valid) {
      const gallaryFormData = this.gallaryForm.value;
      gallaryFormData.image = [];
      // gallaryFormData.image[0] = {};
      // gallaryFormData.image[0].id = this.imageId;
      gallaryFormData.image = this.images;
      this.gallaryService.saveGallaryForm(gallaryFormData).subscribe((response) =>  {
      console.log(response);
      this.dialog.closeAll();

      });
    }
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append('file', image);
      this.fileService.saveFile(formData).subscribe(
        res => {
          console.log(res);
          if (res) {
            this.uploadError = '';
            this.imageId = res.id;
            this.images.push({
              id: this.imageId
            });
            const li: HTMLLIElement = this.renderer.createElement('li');
            const img: HTMLImageElement = this.renderer.createElement('img');
            img.src = res.path;
            this.renderer.addClass(img, 'image');
            const a: HTMLAnchorElement = this.renderer.createElement('a');
            a.innerText = 'Remove';
            this.renderer.addClass(a, 'delete-btn');
            a.addEventListener('click', this.deleteBrowserImage.bind(this, res.id, a));
            // a.addEventListener('click', this.deleteBrowserImage.bind(this, res.response.filename, a));

            this.renderer.appendChild(this.image.nativeElement, li);
            this.renderer.appendChild(li, img);
            this.renderer.appendChild(li, a);

          } else {
            this.uploadError = res.massage;
          }
        },
        err => this.error = err
      );
    }
  }

  deleteBrowserImage(id, a) {
    this.fileService.deleteImage(id).subscribe(
      res => {
        a.parentElement.remove();
      },
      err => this.error = err
    );
  }

  // deleteId(id: number) {
  //   const index: number = this.imageId.indexOf(this.images);
  //   console.log(this.images);
  //   if (index !== -1) {
  //     this.imageId.splice(index, 1);
  //   }
  // }
}
