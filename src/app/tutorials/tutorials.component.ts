import { Component, OnInit } from '@angular/core';
import {AddTestimonialPopupComponent} from '../add-testimonial-popup/add-testimonial-popup.component';
import {MatDialog} from '@angular/material/dialog';
import {AddTutorialsPopupComponent} from './add-tutorials-popup/add-tutorials-popup.component';
import {RegisterServiceService} from '../shared/services/register-service.service';
import {TutorialsService} from '../shared/services/tutorials.service';
import {Observable} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss']
})
export class TutorialsComponent implements OnInit {

  public tutorials: any = [];
  adminLoginStatus$: Observable<boolean>;

  constructor(private dialog: MatDialog, private registerService: RegisterServiceService,
              private tutorialService: TutorialsService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    // for hiding the add/delete testimonial icon
    this.adminLoginStatus$ = this.registerService.isAdminLoggedIn;
    this.tutorialService.refreshNeeded.subscribe(() => {
      this.getAllTutorialsItems();
    });

    this.getAllTutorialsItems();
  }

  private getAllTutorialsItems(){
    const resp = this.tutorialService.getAllTutorials();
    resp.subscribe((data) => this.tutorials = data);
  }


  openAddTutorialPopUp() {
    const dialogRef = this.dialog.open(AddTutorialsPopupComponent, {
      width: '500px',
      height: '300px',
    });
  }

  getEmbeddedUrl(tutorial: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/videoseries?list=' + tutorial.videoIdUrl);

  }

  deleteTutorials(data) {
    const index = this.tutorials.map(x => x.id).indexOf(data.id);
    return this.tutorialService.deleteTutorials(data.id).subscribe(res => {
      this.tutorials.splice(index, 1);
      console.log('Tutorial deleted!');
      confirm('Do you really want to delete?');
    });
  }
}
