import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    DropdownDirective
  ],
  imports: [ CommonModule ],
  exports: [
    DropdownDirective,
    CommonModule
  ]
})

export class SharedModule {

}

/* By default everything setup in a module is only available within that module and isn't accessible from outside. Exports is used to explicitly make a feature/component/directive i.e dropdowndirective accessible to the outside */