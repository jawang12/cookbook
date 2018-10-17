import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesHomeComponent } from './recipes-home/recipes-home.component';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';

const recipesRoutes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    children: [
      {
        path: '',
        component: RecipesHomeComponent
      },
      {
        path: 'new',
        component: RecipeEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: RecipeDetailComponent
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(recipesRoutes)],
  exports: [RouterModule]
})

export class RecipesRoutingModule {

}