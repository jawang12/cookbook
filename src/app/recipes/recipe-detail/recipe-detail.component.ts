import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Ingredients } from '../../shared/ingredients.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  currentRecipe: Recipe;

  constructor(private recipesService: RecipesService, private route: ActivatedRoute) {}

  ngOnInit() {
    // this.currentRecipe = this.recipesService.getSingleRecipe(+this.route.snapshot.params.id);

    this.route.params.subscribe((updatedParams: Params ) => {
      this.currentRecipe = this.recipesService.getSingleRecipe(+updatedParams.id);
    });
  }

  addToShoppingList(ingredientsArr: Ingredients[]) {
    this.recipesService.addMultipleIngredients(ingredientsArr);
  }

}
