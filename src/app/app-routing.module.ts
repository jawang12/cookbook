import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
  { path: '',
    component: HomeComponent
  },
  {
    path: 'recipes',
    loadChildren: './recipes/recipes.module#RecipesModule' //lazy load; since app-routing is lazy loading this module, we do not need to add it to any imports
  },
  {
    path: '**',
    redirectTo: 'recipes'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })], //preloads lazy load modules
  exports: [RouterModule]
})

export class AppRoutingModule {

}