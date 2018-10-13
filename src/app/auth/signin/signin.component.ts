import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent {
  @ViewChild('signinForm') form: NgForm;

  constructor(private auth: AuthService) {}

  onSignin() {
    const email = this.form.value.email;
    const password = this.form.value.password;

    this.auth.onSignin(email, password);
  }

}