
import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { Languages, adminElements } from './header-dummy-data';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthService } from 'src/app/Authentification/auth.service';
import { EventBusService } from 'src/app/Authentification/shared/event-bus.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  eventBusSub?: Subscription;

  constructor(private tokenStorage : TokenStorageService,private authService : AuthService,private eventBusService : EventBusService){}
  
  @Input() ScreenWidth!:number;
  @Input() collapsed!:boolean;
  selectedLanguage:any;
  languages = Languages;
  AdminItems=adminElements;


  
  @HostBinding('class') className='';
  darkClassName='theme-dark';
  lightClassName='them-light';
  
  ngOnInit(): void {
      this.selectedLanguage=this.languages[0];

      this.eventBusSub = this.eventBusService.on('logout', () => {
        this.logout();
      });
  }

  

  onLanguageSelect(lang: any): void {
    this.selectedLanguage = lang;
  }

  HideOverlay() {
    const ngTemplate=document.querySelector('.Hiding') as HTMLElement;
    ngTemplate.classList.add('hide-element');
  }

  hidePlaceholder() {
    const searchInput = document.querySelector('.search') as HTMLInputElement;
      searchInput.classList.add('hide-placeholder');
  }

  showPlaceholder() {
    const searchInput = document.querySelector('.search') as HTMLInputElement;
    searchInput.classList.remove('hide-placeholder');
  }

  // clickOnAdmin(){  
  //   const userBtn=document.querySelector('.head-user-avatar-container') as HTMLElement;
  //     userBtn.classList.add('active');
  //   setTimeout(() => {
  //     userBtn.classList.remove('active');
  //   }, 170);
  // }

  getHeaderClass():string{
    let styleClass=''
    if(this.collapsed && this.ScreenWidth>=768){
      styleClass='head-trimmed';
    }
    else {
      styleClass='head-md-screen';
    }
   return styleClass;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.tokenStorage.signOut();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
  
}
