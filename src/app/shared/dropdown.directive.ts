import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  @HostBinding('class.open') showDropdown: Boolean = false;

  @HostListener('click') toggleDropdown(eventData: Event) {
    this.showDropdown = !this.showDropdown;
  }
}