import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
 selector: 'app-recipe-list',
 templateUrl: './recipe-list.component.html'
})

export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipesService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

}

