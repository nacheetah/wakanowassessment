import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { environment as env } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  HandleError,
  HttpErrorHandler,
} from '@/app/services/http-error-handler.service';
import { catchError } from 'rxjs';

const base_url = env.apiUrl;

@Injectable()
export class AuthService {
  private handleError: HandleError;

  constructor(
    private localStorage: LocalStorageService,
    private http: HttpClient,
    private router: Router,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('auth');
  }

  public getAuthorizationToken() {
    return this.localStorage.get('user')?.token;
  }

  public getLoggedInUser() {
    return this.localStorage.get('user');
  }

  public isLoggedIn() {
    return !!this.localStorage.get('user')?.token;
  }

  public signup(body: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }) {
    return this.http
      .post(`${base_url}/sign-up`, body)
      .pipe(catchError(this.handleError('Sign up', [])));
  }

  public login(body: { email: string; password: string }) {
    return this.http
      .post(`${base_url}/sign-in`, body)
      .pipe(catchError(this.handleError('Log in', [])));
  }

  public logOut() {
    this.localStorage.delete('user');
    this.router.navigate(['/auth', 'login']);
  }
}
