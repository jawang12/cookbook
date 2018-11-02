import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as authActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  @ViewChild('signupForm') form: NgForm;

  constructor(private store: Store<fromApp.AppState>) {}

  onSignup() {
    const username = this.form.controls.email.value;
    const password = this.form.controls.password.value;

    this.store.dispatch(new authActions.SignUpAttempt({ username, password }));
  }
}