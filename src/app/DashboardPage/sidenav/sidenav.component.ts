import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';

interface sideNaveToggle {
   screenWidth: number;
   collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit {
  @Output() onToggleSideNav:EventEmitter<sideNaveToggle>=new EventEmitter();
  
  screenWidth=768; 
  collapsed=true;
  navData=navbarData;

  @HostListener('window:resize',['$event']) 
  onResize(event:any){
    this.screenWidth=window.innerWidth;
    if(this.screenWidth<=768){
      this.collapsed=false;
      this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth:this.screenWidth});
    }else{
      this.collapsed=true;
      this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth:this.screenWidth});
    }
  }
  
  ngOnInit(): void {
      this.screenWidth=window.innerWidth;
      console.log('ngOnInit: '+this.screenWidth);
  }
  
  toggleCollapse(){
   this.collapsed=!this.collapsed;
   console.log('toggleCollapse: '+this.screenWidth);
   this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth:this.screenWidth});
  }

  closeNav(){
    this.collapsed=false;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth:this.screenWidth});
  }

}

