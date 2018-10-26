import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Ingredients } from '../../shared/ingredients.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../store/shopping-list/shopping-list.actions';
import * as fromShoppingList from '../../store/shopping-list/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: [`./shopping-edit.component.css`]
})

export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @Output() addIngredient = new EventEmitter<Ingredients>();
  // @ViewChild('amountInput') amountInput: ElementRef;
  @ViewChild('myForm') myForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  currentIngredient: Ingredients;

  constructor(private store: Store<fromShoppingList.AppState>) {}

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(sListState => {
      if (sListState.editIndex > -1) {
        this.currentIngredient = sListState.editIngredient;
        this.editMode = true;
        this.myForm.setValue({
          name: sListState.editIngredient.name,
          amount: sListState.editIngredient.amount
        });
      }
    })
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.ExitEditMode());
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const name = this.myForm.value.name;
    const amount = this.myForm.value.amount;

    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(new Ingredients(name, amount)));
    }
    else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(new Ingredients(name, amount)));
    }

    this.onClear();
  }

  onClear() {
    this.myForm.reset();
    this.editMode = false;
  }

  onRemove() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

}


// onClick(name: HTMLInputElement) {
//   const iName = name.value;
//   const iAmount = this.amountInput.nativeElement.value;
//   this.sListService.addToIngredients(new Ingredients(iName, iAmount));
// }