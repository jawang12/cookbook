import { Component } from '@angular/core';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: `./recipes.component.html`,
  providers: [RecipesService]
})

export class RecipesComponent {

}