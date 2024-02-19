import {
  HandleError,
  HttpErrorHandler,
} from '@/app/services/http-error-handler.service';
import { environment as env } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';

const base_url = env.apiUrl;
@Injectable()
export class UsersService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private router: Router
  ) {
    this.handleError = httpErrorHandler.createHandleError('Users');
  }

  public getUserDetail(id: string): Observable<any> {
    return this.http
      .get(`${base_url}/${id}`)
      .pipe(catchError(this.handleError('GET USER DETAILS', {})));
  }

  public getUsers(): Observable<any> {
    return this.http
      .get(base_url)
      .pipe(catchError(this.handleError('GET USERS', [])));
  }

  public getPendingUsers(): Observable<any> {
    return this.http
      .get(`${base_url}/pending`)
      .pipe(catchError(this.handleError('GET PENDING USERS', [])));
  }

  public updateUserDetails(
    body: {
      first_name: string;
      last_name: string;
    },
    id: string
  ): Observable<any> {
    return this.http
      .put(`${base_url}/update/${id}`, body)
      .pipe(catchError(this.handleError('UPDATE USER DETAILS', {})));
  }

  public approveUser(id: string): Observable<any> {
    return this.http
      .put(`${base_url}/approve/${id}`, {})
      .pipe(catchError(this.handleError('APROVE USER', {})));
  }

  public deleteUser(id: string): Observable<any> {
    return this.http.delete(`${base_url}/delete/${id}`).pipe(
      tap((e) => this.router.navigate(['/dashboard', 'users'])),
      catchError(this.handleError('DELETE USER', {}))
    );
  }
}
