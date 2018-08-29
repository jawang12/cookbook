import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Ingredients } from '../../shared/ingredients.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() currentRecipe: Recipe;

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
  }

  addToShoppingList(ingredientsArr: Ingredients[]) {
    this.recipesService.addMultipleIngredients(ingredientsArr);
  }

}
