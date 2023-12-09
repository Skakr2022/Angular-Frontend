import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Auth } from "../Authentification/signup/Auth.model";
import { Observable } from "rxjs";

@Injectable({
   providedIn: 'root'
})

export class CustomersService {

   usersURL='http://localhost:8080/user';
   userPaginationUrl='http://localhost:8080/user/paginate';
   constructor(private http:HttpClient){ }
   
   getCustomers():Observable<any> {
     return this.http.get<Auth>(this.usersURL);
   }

   findUsers(
      pageIndex:number,
      pageSize:number,
      sortField:string,
      sortOrder:string
   ):Observable<any>{
      return this.http.get(this.userPaginationUrl,
      { params:new HttpParams()
         .set('page',pageIndex.toString())
         .set('size',pageSize.toString())
         .set('sortField',sortField)
         .set('sortOrder',sortOrder)
      })
   }
}
