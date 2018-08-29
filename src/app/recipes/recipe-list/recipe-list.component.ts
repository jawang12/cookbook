import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';

@Component({
 selector: 'app-recipe-list',
 templateUrl: './recipe-list.component.html'
})

export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipesService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipe();
  }

}

