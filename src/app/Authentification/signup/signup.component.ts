import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { Auth } from './Auth.model';
import { Router } from '@angular/router';
import { AuthValidatorsService } from '../auth-validators.service';
import { CoreService } from 'src/app/services/core.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss','../../../assets/css/styles.min.css']
})
export class SignupComponent implements OnInit {

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  // @ViewChild('f') signupForm! :NgForm;
  @ViewChild('Email') seeNgModel!:NgModel;
  emailFieldBlurred=true;
  signupForm!:FormGroup;
  passwordsMismatch:boolean=false;
  isEmpty:boolean=false;
  constructor(
              private fb:FormBuilder,
              private router:Router,
              private authValidators:AuthValidatorsService,
              private _coreService:CoreService,
              private authService:AuthService
              ){}
  
  ngOnInit(){
    this.signupForm=this.fb.group({
      fullName:['',[Validators.required,this.authValidators.validateFullName]],
      username:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      role:[''],
      password:['',[Validators.required,Validators.minLength(6),this.authValidators.passwordValidator]],
      confirmPassword:['',[Validators.required,this.authValidators.passwordMatchValidator,this.authValidators.passwordValidator]] 
    })

    
  }

  onSubmit(Data: Auth){
    console.log(Data);
    if(this.signupForm.invalid){
          this.authValidators.checkValidForm();
          this.isEmpty=true;
    }
    else{ 

      const formData = new FormData();
      formData.append('fullName',this.signupForm.value.fullName)
      formData.append('email',this.signupForm.value.email)
      formData.append('password',this.signupForm.value.password)
      formData.append('username',this.signupForm.value.username)
      

    this.authService.register(formData).subscribe({
      next: (val: any) => {
        this._coreService.openSnackBar('Product successfully added!');
        this.router.navigate(['/login'])  
      },
      error: (err: any) => {
        console.error(err);
      },
    })
 
    
   }
  }
}



