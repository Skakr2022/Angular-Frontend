import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CoreService } from 'src/app/services/core.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss','../../../assets/css/styles.min.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  loadedPosts:any[]=[];
  isCorrect:boolean=false;
  isEmpty:boolean=false;
  roles: string[] = [];

  constructor(private fb:FormBuilder,
              private router:Router,
              private authService:AuthService,
              private _coreService: CoreService,
              private tokenStorage : TokenStorageService ) { }
  ngOnInit (){
    this.loginForm= this.fb.group({
        username: new FormControl('',[Validators.required]),
        password: new FormControl('',Validators.required) 
    })
    if (this.tokenStorage.isLoggedIn()) {
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  

  onSubmit(){

    const formData = new FormData();
    formData.append("username",this.loginForm.value.username)
    formData.append("password",this.loginForm.value.password)

    this.authService.login(this.loginForm.value.username,this.loginForm.value.password)
    .subscribe({
      next: (data: any) => {
        if (data) {
          console.log(data);
          this.tokenStorage.saveUser(data);
          window.location.reload();
          
        } 
        this._coreService.openSnackBar('user successfully conected!');
      },
      error: (err: any) => {
        console.error(err);
      },
    })
  }
}
