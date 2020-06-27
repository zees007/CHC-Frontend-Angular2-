import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {CoursesComponent} from './courses/courses.component';
import {AchievementsComponent} from './achievements/achievements.component';
import {ContactComponent} from './contact/contact.component';
import {GallaryComponent} from './gallary/gallary.component';
import {DirectorComponent} from './about/director/director.component';
import {ManagerComponent} from './about/manager/manager.component';
import {FacultyComponent} from './about/faculty/faculty.component';
import {FacilityComponent} from './about/facility/facility.component';
import {AdministrationComponent} from './home/administration/administration.component';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {AdminHeaderComponent} from './admin-header/admin-header.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AuthGaurdService as AuthGaurd} from './shared/services/auth-gaurd.service';
import {ContactUsMessagesComponent} from './contact-us-messages/contact-us-messages.component';
import {TutorialsComponent} from './tutorials/tutorials.component';




const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about',
    children: [
      {path: 'director', component: DirectorComponent},
      {path: 'manager', component: ManagerComponent},
      {path: 'faculty', component: FacultyComponent},
      {path: 'facility', component: FacilityComponent}
]
  },
  {path: 'courses', component: CoursesComponent},
  {path: 'gallery', component: GallaryComponent},
  {path: 'achievements', component: AchievementsComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'adminlogin', component: AdminLoginComponent},
  {path: 'adminheader', component: AdminHeaderComponent},
  {path: 'administration', component: AdministrationComponent, canActivate: [AuthGaurd]},
  {path: 'contactusMsg', component: ContactUsMessagesComponent, canActivate: [AuthGaurd]},
  {path: 'admindashboard', component: AdminDashboardComponent, canActivate: [AuthGaurd]},
  {path: 'tutorials', component: TutorialsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]


})
export class AppRoutingModule { }
