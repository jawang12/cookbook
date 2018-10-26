import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { EnterEditMode } from '../store/shopping-list/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingList: Observable<{ ingredients: Ingredients[] }>;

  constructor(private store: Store<{ shoppingList: { ingredients: Ingredients[]} }>) {}

  ngOnInit() {
    this.shoppingList = this.store.select('shoppingList');
  }

  onEdit(index: number) {
    this.store.dispatch(new EnterEditMode(index));
  }
}
