import { Component, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  @ViewChild('signupForm') form: NgForm;
  @ViewChild('password') password: NgModel;

  constructor(private auth: AuthService) {}

  onSignup() {
    const email = this.form.controls.email.value;
    const password = this.form.controls.password.value;

    this.auth.onSignup(email, password);
  }
}