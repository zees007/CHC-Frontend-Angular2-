import {Component, Inject, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {LoginPopupComponent} from '../login-popup/login-popup.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {RegisterServiceService} from '../shared/services/register-service.service';
import {Registration} from '../shared/models/registration.model';
import {NgForm} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {AddLatestUpdateComponent} from './add-latest-update/add-latest-update.component';
import {LatestUpdateService} from '../shared/services/latest-update.service';
import {LatestUpdate} from '../shared/models/latestUpdate.model';
import {AdminDashboardService} from '../shared/services/admin-dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registration: Registration = new Registration(null , '' , '' , '' , '', '');
  msg = '';
  editData;
  subscription: Subscription;
  credentialStatus;
  public latestUpdateData: any = [];
  serialItem: any = [];

  adminLoginStatus$: Observable<boolean>;
  loginStatus$: Observable<boolean>;
  fullname: Observable<string>;

  constructor(private dialog: MatDialog,
              private fb: FormBuilder,
              public registerService: RegisterServiceService,
              private latestUpdateService: LatestUpdateService,
              private adminDashboardService: AdminDashboardService) {
  }
  // registerForm: any = FormGroup;
  // constructor(public dialog: MatDialog, private fb: FormBuilder, public registerService: RegisterServiceService) {
  //   this.registerForm = this.fb.group({
  //     username: new FormControl(''),
  //     password: new FormControl(''),
  //     firstName: new FormControl(''),
  //     lastName: new FormControl(''),
  //     email: new FormControl(''),
  //     contact: new FormControl(''),
  //     school: new FormControl(''),
  //     standard: new FormControl(''),
  //     address: new FormControl('')
  //   });
  // }

  ngOnInit(): void {

    this.subscription = this.adminDashboardService.getEligibilityStatus().subscribe(editData => this.credentialStatus = editData);
    console.log(this.credentialStatus);

    // for hiding the Gallery delete/add icon. only visible to admin login
    this.adminLoginStatus$ = this.registerService.isAdminLoggedIn;

    this.loginStatus$ = this.registerService.isLoggedIn;
    console.log(this.registerService.isLoggedIn);
    this.fullname = this.registerService.currentfullName;
    console.log(this.registerService.currentfullName);

    this.adminDashboardService.getAllSerialByAdminAdded().subscribe((data: {}) => {
      this.serialItem = data;
      console.log(data);
    });

    this.latestUpdateService.refreshNeeded.subscribe(() => {
      this.getLatestUpdates();
    });

    this.getLatestUpdates();

  }

  private getLatestUpdates(){
    const resp = this.latestUpdateService.getAllLatestUpdateList();
    // resp.subscribe((data) => this.faculty = data);
    resp.subscribe((data: {}) => {
      this.latestUpdateData = data;
      console.log(data);
    });
  }

  onLogout(){
    this.registerService.logout();
  }

  openLoginPopUp() {
    const dialogRef = this.dialog.open(LoginPopupComponent, {
      // width: '800px',
      // height: '500px',
      // data: loginData
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result){
        // this.popUpData[this.popUpData.indexOf(loginData)] = result;
      }
    });
  }


  saveRegisterForm(item: NgForm) {
    // if (this.serialItem.serial === true){
       console.log(this.serialItem);
       this.registerService.saveStudentRegisteration(item.value)
        .subscribe((response) => {
            console.log(response),
              item.reset(),
              this.msg = ('Hello..!! You have registered successfully..!!');
          },
          (error => {
              console.log('exception occurred..!'),
                this.msg = ('This Username is already exist, please try another username.');
            }
          ));
    // }else {
    //   console.error('eligibility is not define');
    //   this.msg = 'You are not enrolled in CHC premium membership. Please contact CHC administration for premium account or send query from contact us page.';
    // }

  }

  openLatestUpdatepopUp() {
    const dialogRef = this.dialog.open(AddLatestUpdateComponent, {
       width: '800px',
       height: '500px',
    });


  }

  deleteLatestUpdate(data) {
    const index = this.latestUpdateData.map(x => x.id).indexOf(data.id);
    return this.latestUpdateService.retireLatestUpdate(data.id).subscribe(res => {
      this.latestUpdateData.splice(index, 1);
      console.log('Latest Update deleted!');
      alert('Latest Update deleted successfully..! :)');
    });
  }


}
