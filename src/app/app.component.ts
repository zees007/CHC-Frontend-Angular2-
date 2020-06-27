import {Component, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {LocationStrategy} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit{
  title = 'chc-frontend-new';
  public showMenu: boolean;
  isPopState = false;
  constructor(private router: Router, private locStrat: LocationStrategy) {

    // for not showing footer in one component  adminLogin
    router.events.forEach((event) => {
      if ( event instanceof NavigationStart) {
        this.showMenu = event.url !== '/adminlogin';
      }
    });
  }

  ngOnInit(): void {
    // To overcome this problem when changing router while going to top. Every time I need to scroll to go to top - start
    this.locStrat.onPopState(() => {
      this.isPopState = true;
    });

    this.router.events.subscribe(event => {
      // Scroll to top if accessing a page, not via browser history stack
      if (event instanceof NavigationEnd && !this.isPopState) {
        window.scrollTo(0, 0);
        this.isPopState = false;
      }

      // Ensures that isPopState is reset
      if (event instanceof NavigationEnd) {
        this.isPopState = false;
      }
    });

    // To overcome this problem when changing router while going to top. Every time I need to scroll to go to top - END
  }
}
