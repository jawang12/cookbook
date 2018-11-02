import { Recipe } from '../../recipes/recipe.model';
import { Ingredients } from '../../shared/ingredients.model';
import { AppState } from '../app.reducer';
import * as recipeActions from './recipes.actions';

export interface RecipesLazyFeature extends AppState {
  recipeList: RecipesState
}

export interface RecipesState {
  recipes: Recipe[];
}

const initialState: RecipesState = {
  recipes: [
    new Recipe('Skirt Steak', 'The juiciest steak ever!', 'https://assets.epicurious.com/photos/56f5916916f9f5a007cc1bb0/master/pass/Around-the-Fire_Grilled-Beef-Skirt-Steak.jpg', [new Ingredients('12oz Skirt Steak', 1), new Ingredients('Rosemary', 2)] ),
    new Recipe('Jerk Chicken', 'Watch out for the kick!', 'https://assets.bonappetit.com/photos/58ef9d65f9ef2707d8e770b3/16:9/w_1200,c_limit/miss-ollies-jerk-chicken.jpg', [new Ingredients('All Natural Grass Fed Chicken Breasts', 5), new Ingredients('Allspice', 1), new Ingredients('Thyme', 3)] )
    ]
  }

  export function RecipesReducer(state = initialState, action: recipeActions.RecipeActions) {
    switch(action.type) {
      case recipeActions.RecipeActionTypes.ADD_RECIPE:
        state.recipes.push(action.recipe);
        return {
          ...state
        }
      case recipeActions.RecipeActionTypes.UPDATE_RECIPE:
        state.recipes[action.index] = action.updatedRecipe;
        return {
          ...state
        }
      case recipeActions.RecipeActionTypes.DELETE_RECIPE:
        state.recipes.splice(action.index, 1);
        return {
          ...state
        }
      case recipeActions.RecipeActionTypes.SET_RECIPES:
        state.recipes = action.recipes;
        return {
          ...state
        }
      default:
        return state;
    }
  }