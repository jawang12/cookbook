import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: `app-recipe-item`,
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})

export class RecipeItemComponent {
  @Input() selectedRecipe: Recipe;

  constructor(private recipesService: RecipesService) {}

  onClick() {
    this.recipesService.selectRecipe.emit(this.selectedRecipe);
  }

}