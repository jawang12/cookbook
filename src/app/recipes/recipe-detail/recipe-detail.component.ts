import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRecipes from '../../store/recipes/recipes.reducer';
import * as recipeActions from '../../store/recipes/recipes.actions';
import * as shoppingListActions from '../../store/shopping-list/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  currentRecipe: Observable<Recipe>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipes.RecipesLazyFeature>) {}

  ngOnInit() {
    this.route.params.subscribe((updatedParams: Params ) => {
      this.currentRecipe = this.store.select('recipeList').pipe(map((recipesState: fromRecipes.RecipesState) => {
         return recipesState.recipes[+updatedParams.id];
      }));
    });
  }

  addToShoppingList() {
    this.currentRecipe.pipe(take(1)).subscribe((recipe: Recipe) => {
      this.store.dispatch(new shoppingListActions.AddIngredients(recipe.ingredients));
    });
  }

  onClickDelete() {
    this.store.dispatch(new recipeActions.DeleteRecipe(+this.route.snapshot.params.id));
    this.router.navigate(['/', 'recipes']);
  }

}
