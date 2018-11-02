import { Action } from '@ngrx/store';
import { Recipe } from '../../recipes/recipe.model';

export enum RecipeActionTypes {
  ADD_RECIPE = 'ADD_RECIPE',
  UPDATE_RECIPE = 'UPDATE_RECIPE',
  DELETE_RECIPE = 'DELETE_RECIPE',
  SET_RECIPES = 'SET_RECIPES'
}

export class AddRecipe implements Action {
  readonly type = RecipeActionTypes.ADD_RECIPE;
  constructor(public recipe: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = RecipeActionTypes.UPDATE_RECIPE;
  constructor(public index: number, public updatedRecipe: Recipe) {}
}

export class DeleteRecipe implements Action {
  readonly type = RecipeActionTypes.DELETE_RECIPE;
  constructor(public index: number) {}
}

export class SetRecipes implements Action {
  readonly type = RecipeActionTypes.SET_RECIPES;
  constructor(public recipes: Recipe[]) {}
}

export type RecipeActions =
AddRecipe |
UpdateRecipe |
DeleteRecipe |
SetRecipes;