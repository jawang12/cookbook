import { Component } from '@angular/core';
import { ServerService } from '../../server.service';
import { RecipesService } from '../../recipes/recipes.service';
import { Recipe } from '../../recipes/recipe.model';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(private serverService: ServerService,
              private recipesService: RecipesService,
              private router: Router,
              private auth: AuthService) {}

  onSave() {
    this.serverService.saveRecipes(this.recipesService.getRecipes()).subscribe((response) => {
      console.log(response.json());
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
    this.auth.logout();
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  onDeleteAccount() {
    const confirmed = confirm('Are you sure you want to delete this account?');
    if (confirmed) {
      this.auth.deleteUser();
    }
  }

}