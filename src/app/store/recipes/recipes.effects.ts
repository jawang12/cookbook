import { Effect, Actions } from '@ngrx/effects';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, switchMap, catchError, take, withLatestFrom, tap } from 'rxjs/operators';
import { throwError} from 'rxjs';
import* as recipesActions from './recipes.actions';
import * as fromRecipes from './recipes.reducer';
import { Recipe } from '../../recipes/recipe.model';
import { Store } from '@ngrx/store';

@Injectable()

export class RecipeEffects {
  constructor(private actions$: Actions,
              private router: Router,
              private http: HttpClient,
              private store: Store<fromRecipes.RecipesLazyFeature>) {}

  @Effect()
  loadRecipesFromServer = this.actions$
  .ofType(recipesActions.RecipeActionTypes.LOAD_RECIPES)
  .pipe(switchMap(() => {
    return this.http.get<Recipe[]>('https://ng-cookbook1.firebaseio.com/recipes.json')
  }),
  map((recipes) => {
    for (let recipe of recipes) { //recipes is an iterable
      if (!recipe.ingredients) {
        recipe.ingredients = [];
        //case of no ingredients, firebase removes ingredients prop completely
      }
    }
    return new recipesActions.SetRecipes(recipes);
  }),
  catchError(error => {
    return throwError('error loading recipes ' + error);
  }));

  @Effect({ dispatch: false })
  saveRecipesToServer = this.actions$
  .ofType(recipesActions.RecipeActionTypes.SAVE_RECIPES)
  .pipe(withLatestFrom(this.store.select('recipeList')), switchMap(([action, recipesState]) => {
    //withLatestFrom combines value of another observable with the value of the previous and returns an array
    const req = new HttpRequest('PUT', 'https://ng-cookbook1.firebaseio.com/recipes.json', recipesState.recipes, {
      reportProgress: true
    });
    return this.http.request(req);
  }),
  catchError(error => {
    return throwError('error on save ' + error);
  }));

  @Effect({ dispatch: false })
  redirectToNewRecipeDetail = this.actions$
  .ofType(recipesActions.RecipeActionTypes.ADD_RECIPE)
  .pipe(withLatestFrom(this.store.select('recipeList')), tap(([action, recipesState]) => {
    const totalRecipes = recipesState.recipes.length;
    this.router.navigate([`/`, `recipes`, totalRecipes - 1]);
  }));

}