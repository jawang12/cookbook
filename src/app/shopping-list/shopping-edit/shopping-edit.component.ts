import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Ingredients } from '../../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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
  editIndex: number;
  currentIngredient: Ingredients;

  constructor(private sListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.sListService.editIngredient.subscribe((index: number) => {
      this.editMode = true;
      this.editIndex = index;
      this.currentIngredient = this.sListService.getIngredient(index);
      this.myForm.setValue({
        name: this.currentIngredient.name,
        amount: this.currentIngredient.amount
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const name = this.myForm.value.name;
    const amount = this.myForm.value.amount;

    if (this.editMode) {
      this.sListService.updateIngredient(this.editIndex, new Ingredients(name, amount));
    }
    else {
      this.sListService.addToIngredients(name, amount);
    }

    this.onClear();

  }

  onClear() {
    this.myForm.reset();
    this.editMode = false;
  }

  onRemove() {
    this.sListService.removeIngredient(this.editIndex);
    this.onClear();
  }

}


// onClick(name: HTMLInputElement) {
//   const iName = name.value;
//   const iAmount = this.amountInput.nativeElement.value;
//   this.sListService.addToIngredients(new Ingredients(iName, iAmount));
// }