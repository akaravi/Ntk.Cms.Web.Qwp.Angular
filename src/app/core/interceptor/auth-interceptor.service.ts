import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CmsToastrService } from '../base/cmsToastr.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, public toasterService: CmsToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 0) {
          this.toasterService.typeErrorInternetConnection();
        }
        if (error.status === 401) {
          this.toasterService.typeErrorUserToken();
        }
        return throwError(error);
      }));
  }
}
