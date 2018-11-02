import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map, take } from 'rxjs/operators';
import { AuthState } from '../store/auth/auth.reducer';

@Injectable()

export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, Router: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth').pipe(map((authState: AuthState) => {
      if (authState.authenticated) return true; //returns true inside of observable
      else this.router.navigate(['/']);
    }), take(1))
  }
}