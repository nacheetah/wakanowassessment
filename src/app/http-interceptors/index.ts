import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { checkHeadersInterceptor } from './check-headers.interceptor';

/* This is a 'barrel' file in order to ensure the correct order
 of interceptors and a single and observable point of change */
export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: checkHeadersInterceptor,
    multi: true,
  },
];