import { Component, OnInit } from '@angular/core';
import {LoginPopupComponent} from '../../login-popup/login-popup.component';
import {AddTestimonialPopupComponent} from '../../add-testimonial-popup/add-testimonial-popup.component';
import {MatDialog} from '@angular/material/dialog';
import {FacultyService} from '../../shared/services/faculty.service';
import {TestimonialService} from '../../shared/services/testimonial.service';
import {RegisterServiceService} from '../../shared/services/register-service.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

  public testimonial: any = [];
  adminLoginStatus$: Observable<boolean>;
  constructor(public dialog: MatDialog, private testimonialService: TestimonialService, private registerService: RegisterServiceService ) { }

  ngOnInit(): void {

    // for hiding the add/delete testimonial icon
    this.adminLoginStatus$ = this.registerService.isAdminLoggedIn;
    this.testimonialService.refreshNeeded.subscribe(() => {
      this.getAllTestimonialItems();
    });

    this.getAllTestimonialItems();
  }

  private getAllTestimonialItems(){
    const resp = this.testimonialService.getAllTestimonials();
    resp.subscribe((data) => this.testimonial = data);
  }

  // public deleteTestimonial(id: number){
  //   const resp = this.testimonialService.retireTestimonial(id);
  //   resp.subscribe((data) => this.testimonial = data);
  //   console.log(this.testimonial);
  //   window.location.reload();
  // }

  public deleteTestimonial(data){
    const index = this.testimonial.map(x => x.id).indexOf(data.id);
    return this.testimonialService.retireTestimonial(data.id)
      .subscribe(res => {
        this.testimonial.splice(index, 1)
        console.log('Testimonial deleted!');
        alert('Testimonial Deleted successfully..!');
      });
  }

  openAddTestimonalPopUp() {
    const dialogRef = this.dialog.open(AddTestimonialPopupComponent, {
      width: '400px',
      height: '550px',
      // data: loginData
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result){
        // this.popUpData[this.popUpData.indexOf(loginData)] = result;
      }
    });
  }
}
