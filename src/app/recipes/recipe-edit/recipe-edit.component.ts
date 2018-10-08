import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit {
  id: number;
  enableEdit = false;
  myReactiveForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipesService: RecipesService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((updatedParams: Params) => {
      this.id = +updatedParams.id;
      this.enableEdit = updatedParams.id !== undefined;
      this.initForm();
    });
  }

  private initForm() {
    let name = '';
    let imgUrl = '';
    let description = '';
    let ingredients = new FormArray([]);

    if (this.enableEdit) {
      const recipe = this.recipesService.getSingleRecipe(this.id);
      name = recipe.name;
      imgUrl = recipe.imgUrl;
      description = recipe.description;

      if (recipe.ingredients) {
        recipe.ingredients.forEach(ingredient => {
          ingredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
          }));
        });
      }
    }

    this.myReactiveForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imgUrl': new FormControl(imgUrl, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': ingredients
    });
  }

  onSubmit() {
    const { name, imgUrl, description, ingredients } = this.myReactiveForm.value;

    if (this.enableEdit) {
      this.recipesService.updateRecipe(this.id, new Recipe(name, description, imgUrl, ingredients));
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.recipesService.addRecipe(new Recipe(name, description, imgUrl, ingredients));
      const recipesTotal = this.recipesService.getRecipes().length;
      this.router.navigate([`../${recipesTotal - 1}`], { relativeTo: this.route });
    }
  }

  onCancel() {
    if (this.enableEdit) {
      this.router.navigate([`/recipes/${this.id}`]);
    } else {
      this.router.navigate(['/']);
    }
  }

  onAddIngredient() {
    (<FormArray>this.myReactiveForm.get('ingredients')).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
    }));
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.myReactiveForm.get('ingredients')).removeAt(index);
  }
}