import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../layouts/auth/auth-service.service';

@Injectable()
export class authTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newReq = req;
    if (
      !req.headers.get('Authorization') &&
      req.url !== 'https://simple-auth-crud.onrender.com/sign-in' &&
      req.url !== 'https://simple-auth-crud.onrender.com/sign-up'
    ) {
      newReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getAuthorizationToken()}`,
        },
      });
    }
    return next.handle(newReq);
  }
}
