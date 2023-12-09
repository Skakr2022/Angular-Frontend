import { Injectable } from "@angular/core";
// import { Auth } from "./signup/Auth.model";

export interface AuthData{
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered?:string;
}
@Injectable({
  providedIn: 'root'
})

export class AuthGuard2Service {
  loggedIn!:boolean;
  // constructor(private responseData:AuthData){}

  
  isAuthenticated(){
    const promise=new Promise(
      (resolve,reject)=>{
        setTimeout(()=>{
          resolve(this.loggedIn);
        },100)
      }
    );
    return promise;
  }

  login(){
    // localStorage.setItem('userData',JSON.stringify(responseData));
    this.loggedIn=true;
  }
  logout(){
    this.loggedIn=false;
  }
  
}
