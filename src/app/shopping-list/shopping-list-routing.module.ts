import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';

const shoppinglistroutes: Routes = [
  {
    path: 'shoppinglist',
    component: ShoppingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(shoppinglistroutes)],
  exports: [RouterModule]
})

export class ShoppingListRoutingModule {

}