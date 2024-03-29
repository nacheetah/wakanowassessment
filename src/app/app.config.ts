import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  RouterModule,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';

import { routes } from './app.routes';
import { LocalStorageService } from './services/local-storage.service';
import { httpInterceptorProviders } from './http-interceptors';
import { AuthService } from './layouts/auth/auth-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UsersService } from './modules/dashboard/users/users.service';
import { HttpErrorHandler } from './services/http-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes, withComponentInputBinding()),
    httpInterceptorProviders,
    // LocalStorageService,
    AuthService,
    UsersService,
    HttpErrorHandler,
    HttpClient,
  ],
};
