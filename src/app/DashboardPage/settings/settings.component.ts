import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  roles: any;
  

  constructor(private testService : TestService){}

  ngOnInit(): void {
    this.roles = [];
    this.getRoles();
  }

  

  getRoles(){
    this.testService.getPublicContent().subscribe(
      data => {
        this.roles = data;
        console.log(this.roles);
      }
    )
  }

}
