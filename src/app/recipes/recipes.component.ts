import { Component } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: `./recipes.component.html`,
  providers: [RecipesService]
})

export class RecipesComponent {
  recipeToDetail: Recipe;

  constructor(private recipesService: RecipesService) {
    this.recipesService.selectRecipe.subscribe((recipe: Recipe) => {
      this.recipeToDetail = recipe;
    });
  }

}