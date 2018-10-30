import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { switchMap, take, catchError } from 'rxjs/operators';
import * as fromAuth from '../store/auth/auth.reducer';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(take(1), switchMap((authState: fromAuth.AuthState) => {
      const token = authState.token;
      const clonedReq = req.clone({ params: req.params.set('auth', token) });
      return next.handle(clonedReq);
    }),
    catchError(error => {
      console.log('throwing error');
      return throwError('error thrown -> ' + JSON.stringify(error));
    }));
  }
}