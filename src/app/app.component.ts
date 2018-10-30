import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService) {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDkBUVeI_wxql4tEaOzNeQ9AQrM2SAKDeE",
      authDomain: "ng-cookbook1.firebaseapp.com",
    })

    this.auth.checkAndLoadUser();
  }
}
