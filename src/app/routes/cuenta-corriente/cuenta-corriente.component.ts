import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuenta-corriente',
  templateUrl: './cuenta-corriente.component.html',
  styles: [],
})
export class CuentaCorrienteComponent implements OnInit {
  protected tabii = 0;
  constructor() {}

  ngOnInit() {}

  change(st) {
    if (st) {
      this.tabii = 1;
    } else {
      this.tabii = 0;
    }
  }
}
