import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Ingredients } from '../../shared/ingredients.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  currentRecipe: Recipe;
  currentRecipeSubscription: Subscription;

  constructor(private recipesService: RecipesService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((updatedParams: Params ) => {
      this.currentRecipe = this.recipesService.getSingleRecipe(+updatedParams.id);
    });

    this.currentRecipeSubscription = this.recipesService.updateCurrentRecipe.subscribe(() => {
      this.currentRecipe = this.recipesService.getSingleRecipe(+this.route.snapshot.params.id);
    })
  }

  ngOnDestroy() {
    this.currentRecipeSubscription.unsubscribe();
  }

  addToShoppingList(ingredientsArr: Ingredients[]) {
    this.recipesService.addMultipleIngredients(ingredientsArr);
  }

  onClickDelete() {
    this.recipesService.deleteRecipe(+this.route.snapshot.params.id);
    this.router.navigate(['/']);
  }

}
