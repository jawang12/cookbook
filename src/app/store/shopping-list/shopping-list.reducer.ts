import {
  ShoppingListActions,
  ShoppingListActionTypes
} from './shopping-list.actions';
import { Ingredients } from '../../shared/ingredients.model';

export interface ShoppingListState {
  ingredients: Ingredients[],
  editIndex: number,
  editIngredient: Ingredients
}

const initialState: ShoppingListState = {
  ingredients: [
    new Ingredients('Cherrys', 10),
    new Ingredients('Apples', 2)
  ],
  editIndex: -1,
  editIngredient: null
}

export function ShoppingListReducer(state = initialState, action: ShoppingListActions) {
  switch(action.type) {
    case ShoppingListActionTypes.ADD_INGREDIENT:
      const existingIngredient = state.ingredients.find(ingredient => ingredient.name === action.addedIngredient.name);
      if (existingIngredient) existingIngredient.amount += action.addedIngredient.amount;
      else state.ingredients.push(action.addedIngredient);
      return {
        ...state
      }
    case ShoppingListActionTypes.ADD_INGREDIENTS:
      action.addedIngredients.forEach(ingredientToBeAdded => {
        const doesIngredientExist = state.ingredients.some(ingredient => {
          if (ingredient.name === ingredientToBeAdded.name) {
            ingredient.amount += ingredientToBeAdded.amount;
            return true;
          }
        })
        if (!doesIngredientExist) {
          state.ingredients.push(new Ingredients(ingredientToBeAdded.name, ingredientToBeAdded.amount));
          //fixes bug in initial recipe detail, it removes reference from original recipes.ingredients[]
        }
      })
      return {
        ...state
      }
    case ShoppingListActionTypes.ENTER_EDITMODE:
      const newState = Object.assign(state, { editIndex: action.index, editIngredient: state.ingredients[action.index] });
      return {
        ...newState
      }
    case ShoppingListActionTypes.EXIT_EDITMODE:
      return {
        ...state,
        editIndex: -1,
        editIngredient: null
      }
    case ShoppingListActionTypes.UPDATE_INGREDIENT:
      const updatedIngredient = Object.assign(state.editIngredient, action.updatedIngredient);
      state.ingredients[state.editIndex] = updatedIngredient;
      /*
      const updatedIngredient = {
        ...state.ingredients[state.editIndex],
        ...action.updatedIngredient
      }
      state.ingredients[state.editIndex] = updatedIngredient;
      */
      return {
        ...state,
        editIndex: -1,
        editIngredient: null
      }
    case ShoppingListActionTypes.DELETE_INGREDIENT:
      state.ingredients.splice(state.editIndex, 1);
      return {
        ...state,
        editIndex: -1,
        editIngredient: null
      }
    default:
      return state;
  }
}