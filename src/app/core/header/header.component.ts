import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as authActions from '../../store/auth/auth.actions';
import * as fromAuth from '../../store/auth/auth.reducer';
import * as recipesActions from '../../store/recipes/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  authState: Observable<fromAuth.AuthState>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSave() {
    this.store.dispatch(new recipesActions.SaveRecipes());
  }

  onFetch() {
    this.store.dispatch(new recipesActions.LoadRecipes());
  }

  onLogout() {
    this.store.dispatch(new authActions.Logout());
  }

  onDeleteAccount() {
    const confirmed = confirm('Are you sure you want to delete this account?');
    if (confirmed) {
      this.store.dispatch(new authActions.DeleteUser());
    }
  }

}