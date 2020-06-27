import {Component, Input, OnInit} from '@angular/core';
import {AddTestimonialPopupComponent} from '../add-testimonial-popup/add-testimonial-popup.component';
import {MatDialog} from '@angular/material/dialog';
import {TestimonialService} from '../shared/services/testimonial.service';
import {RegisterServiceService} from '../shared/services/register-service.service';
import {AddGallaryPopUpComponent} from './add-gallary-pop-up/add-gallary-pop-up.component';
import {AddGallerydialogComponent} from './add-gallerydialog/add-gallerydialog.component';
import {AddNewGalleryItemPopUpComponent} from './add-new-gallery-item-pop-up/add-new-gallery-item-pop-up.component';
import {GallaryService} from '../shared/services/gallary.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.scss']
})
export class GallaryComponent implements OnInit {


  adminLoginStatus$: Observable<boolean>;

  constructor(public dialog: MatDialog, private registerService: RegisterServiceService, private gallaryService: GallaryService) { }

  ngOnInit(): void {

     // for hiding the Gallery delete/add icon. only visible to admin login
    this.adminLoginStatus$ = this.registerService.isAdminLoggedIn;
  }

  openAddGallaryPopUp() {

    const dialogRef = this.dialog.open(AddGallaryPopUpComponent, {
      width: '1400px',
      height: '500px',

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result){
      }
    });

  }
}
