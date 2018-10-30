import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as authActions from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  onSignup(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(credentials => {
      this.store.dispatch(new authActions.SignUp());
      firebase.auth().currentUser.getIdToken()
      .then(storageToken => {
        this.store.dispatch(new authActions.SetToken(storageToken));
        this.router.navigate(['/', 'recipes']);
      })
    })
    .catch(error => console.error(error));
  }

  onSignin(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      this.store.dispatch(new authActions.SignIn());
      firebase.auth().currentUser.getIdToken()
      .then((storageToken => {
        this.store.dispatch(new authActions.SetToken(storageToken));
        this.router.navigate(['/']);
      }))
    })
    .catch(error => console.error(error));
  }

  checkAndLoadUser() { //persistence
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('success user', user);
        user.getIdToken()
        .then((currentToken: string) => {
          this.store.dispatch(new authActions.PersistedSignIn(currentToken));
        })
      }
    });
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new authActions.Logout());
    this.router.navigate(['/']);
  }

  deleteUser() {
    firebase.auth().currentUser.delete();
    this.store.dispatch(new authActions.DeleteUser());
    this.router.navigate(['/']);
  }
}