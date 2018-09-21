import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {

  constructor(private dropdown: ElementRef) {}

  @HostBinding('class.open') showDropdown: Boolean = false;

  @HostListener('click') toggleDropdown(eventData: Event) {
    this.showDropdown = !this.showDropdown;
  }
  @HostListener('document: click', ['$event.target']) clickOut(targetElement) {
    const insideClick = this.dropdown.nativeElement.contains(targetElement);
    if (!insideClick) this.showDropdown = false;
  }
}