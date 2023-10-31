import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { EventBusService } from '../shared/event-bus.service';
import { Route, Router } from '@angular/router';
import { EventData } from '../shared/event.class';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private eventBusService: EventBusService, private tokenStorage : TokenStorageService) {}


  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if(!this.isRefreshing){
      console.log('test')
      this.isRefreshing = true;
      if(this.tokenStorage.isLoggedIn()){
        console.log('test2')
        this.eventBusService.emit(new EventData('logout', null));
      }
    }
    // let a=  true
    //   console.log(this.isRefreshing)
    //   this.isRefreshing = true
    //   console.log(a)
    //   if (a) {
    //     console.log("is looged in")
    //     window.sessionStorage.clear();
        
      
    // }

    return next.handle(request);
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      request = request.clone({
        withCredentials: true
      });
      return next.handle(request).pipe(
        catchError( (error) => {
          console.log("is catch error")
          if (
            error instanceof HttpErrorResponse &&
            error.status === 401
          ) {
            return this.handle401Error(request, next);
          }
          return throwError(() => error)
        } )
      );
  }

}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
