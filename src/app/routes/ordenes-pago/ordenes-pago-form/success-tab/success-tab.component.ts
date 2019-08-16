import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-success-tab',
  templateUrl: './success-tab.component.html',
  styles: [],
})
export class SuccessTabComponent {
  @Output() crear = new EventEmitter();
  @Output() cerrar = new EventEmitter();
  @Input() total: number;
  @Input() totalFacturas: number;

  constructor() {}
}
