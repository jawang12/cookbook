import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredients } from '../../shared/ingredients.model';

//discriminated union
export enum ShoppingListActionTypes {
  ADD_INGREDIENT = 'ADD_INGREDIENT',
  ADD_INGREDIENTS = 'ADD_INGREDIENTS',
  UPDATE_INGREDIENT = 'UPDATE_INGREDIENT',
  DELETE_INGREDIENT = 'DELETE_INGREDIENT',
  ENTER_EDITMODE = 'ENTER_EDITMODE',
  EXIT_EDITMODE = 'EXIT_EDITMODE'
}

export class AddIngredient implements Action {
  readonly type = ShoppingListActionTypes.ADD_INGREDIENT;
  constructor(public addedIngredient: Ingredients) {}
}

export class AddIngredients implements Action {
  readonly type = ShoppingListActionTypes.ADD_INGREDIENTS;
  constructor(public addedIngredients: Ingredients[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = ShoppingListActionTypes.UPDATE_INGREDIENT;
  constructor(public updatedIngredient: Ingredients) {}
}

export class DeleteIngredient implements Action {
  readonly type = ShoppingListActionTypes.DELETE_INGREDIENT;
}

export class EnterEditMode implements Action {
  readonly type = ShoppingListActionTypes.ENTER_EDITMODE;
  constructor(public index: number) {}
}

export class ExitEditMode implements Action {
  readonly type = ShoppingListActionTypes.EXIT_EDITMODE;
}

export type ShoppingListActions =
AddIngredient |
AddIngredients |
UpdateIngredient |
DeleteIngredient |
EnterEditMode |
ExitEditMode;
