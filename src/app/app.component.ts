import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import * as authActions from './store/auth/auth.actions';
import * as fromApp from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDkBUVeI_wxql4tEaOzNeQ9AQrM2SAKDeE',
      authDomain: 'ng-cookbook1.firebaseapp.com',
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.store.dispatch(new authActions.UserReentry(user));
      }
    });
  }
}
