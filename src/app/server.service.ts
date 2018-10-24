import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Recipe } from './recipes/recipe.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Response } from '@angular/http';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class ServerService {

  constructor(private http: HttpClient, private auth: AuthService) {}

  saveRecipes(recipes: Recipe[]) {
    const req = new HttpRequest('PUT', 'https://ng-cookbook1.firebaseio.com/recipes.json', recipes, {
      reportProgress: true //replaces { observer: 'events' }
    });
    return this.http.request(req); //returns the observable
  }

  fetchRecipes() {
    const token = this.auth.getToken();
    return this.http.get<Recipe[]>('https://ng-cookbook1.firebaseio.com/recipes.json', {
      params: new HttpParams().set('auth', token)
    })
    .pipe(map(recipes => {
      // httpClient by default extracts response body and converts it to json
      // map transforms entire response and returns the observable;
      // const recipes: Recipe[] = response.json();
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