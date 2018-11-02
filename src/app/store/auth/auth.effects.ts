import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as authActions from './auth.actions';
import * as firebase from 'firebase';
import { from, throwError } from 'rxjs';
import { map, mergeMap, switchMap, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()

export class AuthEffects {
  //Actions: observes all the actions used for side effect purposes; returns final action to reducer
  constructor(private actions$: Actions, private router: Router) {}

  @Effect()
  signUp = this.actions$
  .ofType(authActions.AuthActionTypes.ATTEMPT_SIGN_UP) //listens and catches the given action type
  //code below will only execute if the above action type is dispatched to the store
  .pipe(map((actionClass: authActions.SignUpAttempt) => {
    return actionClass.user;
  }), switchMap((user: { username: string, password: string }) => {
    return from(firebase.auth().createUserWithEmailAndPassword(user.username, user.password));
  }), switchMap(() => {
    return from(firebase.auth().currentUser.getIdToken()) //from: transforms a promise into an observable
  }), mergeMap((token: string) => {
    this.router.navigate(['/']);
    return [
      new authActions.SignUp(),
      new authActions.SetToken(token)
    ];
  }), catchError(error => {
    return throwError('error occured during sign in -> ' + error);
  }));

  @Effect()
  signIn = this.actions$
  .ofType(authActions.AuthActionTypes.EP_SIGN_IN)
  .pipe(map((actionClass: authActions.EPSignIn) => {
    return actionClass.info;
  }), switchMap(({ username, password }) => {
    return from(firebase.auth().signInWithEmailAndPassword(username, password));
  }), switchMap(() => {
    return from(firebase.auth().currentUser.getIdToken());
  }), mergeMap(token => {
    this.router.navigate(['/', 'recipes']);
    return [
      new authActions.SignIn(),
      new authActions.SetToken(token)
    ]
  }));

  @Effect()
  reentry = this.actions$
  .ofType(authActions.AuthActionTypes.USER_REENTRY)
  .pipe(switchMap((actionClass: authActions.UserReentry) => {
    return from(actionClass.user.getIdToken());
  }), mergeMap(token => {
    return [
      new authActions.SignIn(),
      new authActions.SetToken(token)
      ]
  }));

  @Effect({ dispatch: false })
  logout = this.actions$
  .ofType(authActions.AuthActionTypes.LOGOUT)
  .pipe(tap(() => {
    firebase.auth().signOut();
    this.router.navigate(['/']);
  }));

  @Effect({ dispatch: false })
  deleteUser = this.actions$
  .ofType(authActions.AuthActionTypes.DELETE_USER)
  .pipe(tap(() => {
    firebase.auth().currentUser.delete();
    this.router.navigate(['/']);
  }));
}