import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddAchievementPopupComponent} from './add-achievement-popup/add-achievement-popup.component';
import {AchievementService} from '../shared/services/achievement.service';
import {Observable} from 'rxjs';
import {RegisterServiceService} from '../shared/services/register-service.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit {

  adminLoginStatus$: Observable<boolean>;
  public achievement: any = [];

  constructor(private dialog: MatDialog,
              private achievmentService: AchievementService,
              private registerService: RegisterServiceService) { }

  ngOnInit(): void {

    // for hiding the faculty delete/add icon. only visible to admin login
    this.adminLoginStatus$ = this.registerService.isAdminLoggedIn;

    this.achievmentService.refreshNeeded.subscribe(() => {
      this.getAllAchievementsData();
    });

    this.getAllAchievementsData();
  }

  private getAllAchievementsData(){
    const resp = this.achievmentService.getAchievements();
    // resp.subscribe((data) => this.faculty = data);
    resp.subscribe((data: {}) => {
      this.achievement = data;
    });
  }

  openAddAchievementDialog() {
    const dialogRef = this.dialog.open(AddAchievementPopupComponent, {
      width: '1000px',
      height: '500px'
      // data: items
    });
    dialogRef.afterClosed();
  }

  deleteAchievement(data) {
    const index = this.achievement.map(x => x.id).indexOf(data.id);
    return this.achievmentService.retireAchievement(data.id).subscribe(res => {
      this.achievement.splice(index, 1);
      console.log('Achievement deleted!');
      alert('Achievement Deleted successfully..!');
    });
  }
}
