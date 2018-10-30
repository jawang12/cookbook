import { AuthState, AuthReducer } from './auth/auth.reducer';
import { ShoppingListState, ShoppingListReducer } from './shopping-list/shopping-list.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingList: ShoppingListState,
  auth: AuthState
}

export const combinedReducers: ActionReducerMap<AppState> = {
  shoppingList: ShoppingListReducer,
  auth: AuthReducer
}