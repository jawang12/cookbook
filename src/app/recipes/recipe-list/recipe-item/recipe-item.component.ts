import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: `app-recipe-item`,
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})

export class RecipeItemComponent {
  @Input() selectedRecipe: Recipe;
  @Input() id: number;

}