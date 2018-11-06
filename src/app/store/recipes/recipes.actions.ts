import { Action } from '@ngrx/store';
import { Recipe } from '../../recipes/recipe.model';

export enum RecipeActionTypes {
  ADD_RECIPE = 'ADD_RECIPE',
  UPDATE_RECIPE = 'UPDATE_RECIPE',
  DELETE_RECIPE = 'DELETE_RECIPE',
  SET_RECIPES = 'SET_RECIPES',
  LOAD_RECIPES = 'LOAD_RECIPES',
  SAVE_RECIPES = 'SAVE_RECIPES'
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

export class LoadRecipes implements Action {
  readonly type = RecipeActionTypes.LOAD_RECIPES;
}

export class SaveRecipes implements Action {
  readonly type = RecipeActionTypes.SAVE_RECIPES;
}

export type RecipeActions =
AddRecipe |
UpdateRecipe |
DeleteRecipe |
SetRecipes;