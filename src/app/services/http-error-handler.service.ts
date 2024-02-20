import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { AuthService } from '../layouts/auth/auth-service.service';
import { Router } from '@angular/router';

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError = <T>(
  operation?: string,
  result?: T
) => (error: HttpErrorResponse) => Observable<T>;

/** Gracefully handles httpClient errors for this projects */
@Injectable({ providedIn: 'root' })
export class HttpErrorHandler {
  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  /** optional handleError function that already knows the service name */
  createHandleError =
    (nameOfService = '') =>
    <T>(action = 'operation', result = {} as T) =>
      this.handleError(nameOfService, action, result);

  /**
   * Returns a function that handles Http operation errors gracefully
   *
   * @param nameOfService = name of the data service that attempted the operation
   * @param action - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(nameOfService = '', action = 'operation', result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status === 403) {
        alert(error.error.message || 'Token expired, please log in again');
        this.localStorage.delete('user');
        this.router.navigate(['/auth', 'login']);
      }
      if (error.status === 404 && action == 'GET USER DETAILS') {
        // User not found navigate back to safety
        alert(error.error.message || 'User not found');
        this.router.navigate(['/dashboard', 'users']);
      }
      if (error.status === 401 && (action == 'Sign up' || action == 'Log in')) {
        // Incorrect credentials, Inform user
        alert(error.error.message || 'Incorrect email and password');
      }
      if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error);
      } else {
        // Log possible server error info
        console.error(
          `Backend returned code ${error.status}, body was: `,
          error.error
        );
      }

      const message =
        error.error instanceof ErrorEvent
          ? error.error.message
          : `server returned code ${error.status} with body "${error.error}"`;

      // log error
      console.log(message);

      return of(result);
    };
  }
}
