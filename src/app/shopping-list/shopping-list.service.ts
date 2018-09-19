import { Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredients[]>();
  editIngredient: Subject<number> = new Subject<number>();

  private ingredients: Ingredients[] = [new Ingredients('Cherrys', 10), new Ingredients('Apples', 2)];

  addToIngredients(name: string, amount: number) {
    const existingIngredient = this.ingredients.find(ingredient => ingredient.name === name);
    /* since arr and obj are pass by reference, extracted the single class/instance for ingredient name if there already is one and any changes made will also be made everywhere else it is referenced */
    if (existingIngredient){
      existingIngredient.amount += amount;
    }
    else {
      this.ingredients.push(new Ingredients(name, amount));
    }
    this.ingredientsChanged.next(this.ingredients);
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, updatedIngredient: Ingredients) {
    this.ingredients[index] = updatedIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
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

    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
