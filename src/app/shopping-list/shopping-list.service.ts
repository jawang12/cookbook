import { Injectable, EventEmitter } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredients[]>();
  private ingredients: Ingredients[] = [new Ingredients('Cherrys', 10), new Ingredients('Apples', 2)];

  addToIngredients(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients);
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addMultipleIngredients(currentIngredients: Ingredients[]) {
    currentIngredients.forEach(ingredient => {
      const isAlreadyListed = this.ingredients.some(ingredObj => {
        if (ingredObj.name === ingredient.name) {
          ingredObj.amount += ingredient.amount;
          return true;
        }
      });
      if (!isAlreadyListed) this.ingredients.push(new Ingredients(ingredient.name, ingredient.amount));
      //fixes bug in initial recipe detail, removes reference from original recipes.ingredients[]
    });

    this.ingredientsChanged.emit(this.ingredients.slice());
  }

}
