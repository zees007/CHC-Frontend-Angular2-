import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { CoursesComponent } from './courses/courses.component';
import { GallaryComponent } from './gallary/gallary.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { HomeContainerComponent } from './home/home-container/home-container.component';
import { TestimonialsComponent } from './home/testimonials/testimonials.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DirectorComponent } from './about/director/director.component';
import { ManagerComponent } from './about/manager/manager.component';
import { FacultyComponent } from './about/faculty/faculty.component';
import { FacilityComponent } from './about/facility/facility.component';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddTestimonialPopupComponent } from './add-testimonial-popup/add-testimonial-popup.component';
import { AddNewFacultyPopupComponent } from './about/faculty/add-new-faculty-popup/add-new-faculty-popup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClientModule} from '@angular/common/http';
import {AdministrationComponent} from './home/administration/administration.component';
import {FacultyService} from './shared/services/faculty.service';
import {RegisterServiceService} from './shared/services/register-service.service';
import {TestimonialService} from './shared/services/testimonial.service';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { GallaryContentsComponent } from './gallary/gallary-contents/gallary-contents.component';
import { AddGallaryPopUpComponent } from './gallary/add-gallary-pop-up/add-gallary-pop-up.component';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {FileUploadModule} from 'ng2-file-upload';
import {MatIconModule} from '@angular/material/icon';
import {GallaryService} from './shared/services/gallary.service';
import { AddGallerydialogComponent } from './gallary/add-gallerydialog/add-gallerydialog.component';
import { AddNewGalleryItemPopUpComponent } from './gallary/add-new-gallery-item-pop-up/add-new-gallery-item-pop-up.component';
import {MatTableModule} from '@angular/material/table';
import { AddStudentPopUpComponent } from './admin-dashboard/add-student-pop-up/add-student-pop-up.component';
import {AuthGaurdService} from './shared/services/auth-gaurd.service';
import {AdminDashboardService} from './shared/services/admin-dashboard.service';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { AddLatestUpdateComponent } from './home/add-latest-update/add-latest-update.component';
import { AddAchievementPopupComponent } from './achievements/add-achievement-popup/add-achievement-popup.component';
import { ContactUsMessagesComponent } from './contact-us-messages/contact-us-messages.component';
import { ReplyEmailComponent } from './contact-us-messages/reply-email/reply-email.component';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { EditAdmindashboarddataComponent } from './edit-admindashboarddata/edit-admindashboarddata.component';
import { AddTutorialsPopupComponent } from './tutorials/add-tutorials-popup/add-tutorials-popup.component';
import { UniqueSerialValidatorDirective } from './shared/decorators/unique-serial-validator.directive';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AboutComponent,
    CoursesComponent,
    GallaryComponent,
    AchievementsComponent,
    ContactComponent,
    FooterComponent,
    HomeContainerComponent,
    TestimonialsComponent,
    DirectorComponent,
    ManagerComponent,
    FacultyComponent,
    FacilityComponent,
    LoginPopupComponent,
    AddTestimonialPopupComponent,
    AddNewFacultyPopupComponent,
    AdministrationComponent,
    AdminLoginComponent,
    AdminHeaderComponent,
    AdminDashboardComponent,
    GallaryContentsComponent,
    AddGallaryPopUpComponent,
    AddGallerydialogComponent,
    AddNewGalleryItemPopUpComponent,
    AddStudentPopUpComponent,
    AddLatestUpdateComponent,
    AddAchievementPopupComponent,
    ContactUsMessagesComponent,
    ReplyEmailComponent,
    TutorialsComponent,
    EditAdmindashboarddataComponent,
    AddTutorialsPopupComponent,
    UniqueSerialValidatorDirective,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatCardModule,
    MatSelectModule,
    FileUploadModule,
    MatIconModule,
    MatTableModule,
    Ng2SearchPipeModule
  ],
  providers: [FacultyService, RegisterServiceService, TestimonialService, GallaryService, AuthGaurdService, AdminDashboardService],
  entryComponents: [AddNewFacultyPopupComponent, AddGallaryPopUpComponent, EditAdmindashboarddataComponent, AddAchievementPopupComponent, AddLatestUpdateComponent, AddStudentPopUpComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
