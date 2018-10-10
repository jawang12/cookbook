import { Http } from '@angular/http';
import { Recipe } from './recipes/recipe.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})

export class ServerService {

  constructor(private http: Http) {}

  saveRecipes(recipes: Recipe[]) {
    return this.http.put('https://ng-cookbook1.firebaseio.com/recipes.json', recipes);
  }

  fetchRecipes() {
    return this.http.get('https://ng-cookbook1.firebaseio.com/recipes.json')
    .pipe(map((response: Response) => {
      // map transforms entire response and returns the observable
      const recipes: Recipe[] = response.json();
      return recipes.map(recipe => {
        if (!(recipe.ingredients)) {
          recipe.ingredients = [];
          //case of no ingredients, firebase removes ingredients prop completely
        }
        return recipe;
      })
    }));
  }
}