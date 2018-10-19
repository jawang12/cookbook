import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private router: Router) {}

  token: string;

  onSignup(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(credentials => {
      console.log(credentials);
    })
    .catch(error => console.error(error));
  }

  onSignin(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      this.router.navigate(['/']);
      firebase.auth().currentUser.getIdToken()
      .then((storageToken => {
        this.token = storageToken;
      }))
    })
    .catch(error => console.error(error));
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
    .then(currentToken => {
      this.token = currentToken;
    })
    .catch(error => console.error(error));
    //makes sure token is still valid if not renews it
    return this.token;
  }

  isAuthenticated() {
    return Boolean(this.token);
  }

  checkAndLoadUser() { //persistence
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) this.token = null;
      else {
        user.getIdToken()
        .then((currentToken: string) => {
          this.token = currentToken;
        })
      }
    });
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/']);
  }
}