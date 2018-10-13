import { Http } from '@angular/http';
import { Recipe } from './recipes/recipe.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Response } from '@angular/http';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class ServerService {

  constructor(private http: Http, private auth: AuthService) {}

  saveRecipes(recipes: Recipe[]) {
    const token = this.auth.getToken();
    return this.http.put('https://ng-cookbook1.firebaseio.com/recipes.json/?auth=' + token, recipes);
  }

  fetchRecipes() {
    const token = this.auth.getToken();
    return this.http.get('https://ng-cookbook1.firebaseio.com/recipes.json/?auth=' + token)
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