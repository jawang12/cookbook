import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../server.service';
import { RecipesService } from '../../recipes/recipes.service';
import { Recipe } from '../../recipes/recipe.model';
import { Router } from '@angular/router';
import { HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as authActions from '../../store/auth/auth.actions';
import * as fromAuth from '../../store/auth/auth.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  authState: Observable<fromAuth.AuthState>;

  constructor(private serverService: ServerService,
              private recipesService: RecipesService,
              private router: Router,
              private store: Store<fromApp.AppState>) {}
  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSave() {
    this.serverService.saveRecipes(this.recipesService.getRecipes()).subscribe((status: HttpEvent<Object>) => {
      console.log(status,'on save log');
    }, (error) => console.log(error));
  }

  onFetch() {
    this.serverService.fetchRecipes().subscribe((recipes: Recipe[]) => {
      const recipeDetail = this.router.routerState.snapshot.url.slice(1).split('/');
      this.recipesService.setRecipes(recipes, recipeDetail[0] === 'recipes' && recipeDetail.length === 2);
    },
    (error) => console.log(error));
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