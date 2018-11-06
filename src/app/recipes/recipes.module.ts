import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RecipesRoutingModule } from './recipes-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipesComponent } from './recipes.component';
import { RecipesHomeComponent } from './recipes-home/recipes-home.component';
import { RecipesReducer } from '../store/recipes/recipes.reducer';
import { RecipeEffects } from '../store/recipes/recipes.effects';

@NgModule({
  declarations: [
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipesHomeComponent,
    RecipesComponent
  ],
  imports: [
    RecipesRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('recipeList', RecipesReducer),
    EffectsModule.forFeature([RecipeEffects])
  ]
})

export class RecipesModule {

}