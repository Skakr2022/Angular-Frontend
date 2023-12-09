import { Component } from "@angular/core";


interface sideNaveToggle {
    screenWidth: number;
    collapsed: boolean;
  }
  
@Component({
    selector:'app-DashboardPage',
    templateUrl: './DashboardPage.component.html',
    styleUrls: ['./DashboardPage.component.scss']
})

export class DashboardPageComponent {
    isSideNavCollapsed=true;
    screenWidth=768;
    OnToggleSideNav(data:sideNaveToggle){
      this.screenWidth=data.screenWidth;
      this.isSideNavCollapsed=data.collapsed;
    }
}