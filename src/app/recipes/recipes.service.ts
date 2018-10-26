import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AddIngredients } from '../store/shopping-list/shopping-list.actions';

@Injectable({
  providedIn: 'root'
})

export class RecipesService {
  updateRecipes: Subject<Recipe[]> = new Subject<Recipe[]>();
  updateCurrentRecipe: Subject<void> = new Subject<void>();
  private recipes: Recipe[] = [
  new Recipe('Skirt Steak', 'The juiciest steak ever!', 'https://assets.epicurious.com/photos/56f5916916f9f5a007cc1bb0/master/pass/Around-the-Fire_Grilled-Beef-Skirt-Steak.jpg', [new Ingredients('12oz Skirt Steak', 1), new Ingredients('Rosemary', 2)] ),
  new Recipe('Jerk Chicken', 'Watch out for the kick!', 'https://assets.bonappetit.com/photos/58ef9d65f9ef2707d8e770b3/16:9/w_1200,c_limit/miss-ollies-jerk-chicken.jpg', [new Ingredients('All Natural Grass Fed Chicken Breasts', 5), new Ingredients('Allspice', 1), new Ingredients('Thyme', 3)] )
  ];

  constructor(private store: Store<{ shoppingList: { ingredients: Ingredients[] } }>) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getSingleRecipe(id: number) {
    return this.recipes[id];
  }

  addMultipleIngredients(ingredients: Ingredients[]) {
    this.store.dispatch(new AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.updateRecipes.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.updateRecipes.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.updateRecipes.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[], hasDetails?: boolean) {
    this.recipes = recipes;
    this.updateRecipes.next(this.recipes.slice());
    if (hasDetails) {
      this.updateCurrentRecipe.next();
    }
  }

}
