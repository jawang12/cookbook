import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {

  @Output() toggleView: EventEmitter<string> = new EventEmitter<string>();

  onClick(type: string) {
    this.toggleView.emit(type);
  }

}