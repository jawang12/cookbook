import { Component, ViewChild, ElementRef } from '@angular/core';
import { Ingredients } from '../../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: [`./shopping-edit.component.css`]
})

export class ShoppingEditComponent {
  // @Output() addIngredient = new EventEmitter<Ingredients>();
  @ViewChild('amountInput') amountInput: ElementRef;

  constructor(private sListService: ShoppingListService) {}

  onClick(name: HTMLInputElement) {
    const iName = name.value;
    const iAmount = this.amountInput.nativeElement.value;
    this.sListService.addToIngredients(new Ingredients(iName, iAmount));
  }

}