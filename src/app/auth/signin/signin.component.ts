import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as authActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent {
  @ViewChild('signinForm') form: NgForm;

  constructor(private store: Store<fromApp.AppState>) {}

  onSignin() {
    const username = this.form.value.email;
    const password = this.form.value.password;

    this.store.dispatch(new authActions.EPSignIn({ username, password }));
  }

}