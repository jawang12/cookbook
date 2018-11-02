import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRecipes from '../../store/recipes/recipes.reducer';

@Component({
 selector: 'app-recipe-list',
 templateUrl: './recipe-list.component.html'
})

export class RecipeListComponent implements OnInit {
  recipes: Observable<fromRecipes.RecipesState>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromRecipes.RecipesLazyFeature>) {}

  ngOnInit() {
    this.recipes = this.store.select('recipeList');
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

}

