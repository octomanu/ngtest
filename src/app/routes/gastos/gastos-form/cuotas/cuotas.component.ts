import { Component, OnInit } from '@angular/core';
import { GastosForm } from '../../forms/gastos.form';
@Component({
  selector: 'app-cuotas',
  templateUrl: './cuotas.component.html',
  styles: [],
})
export class CuotasComponent implements OnInit {
  constructor(protected fb: GastosForm) {}
  ngOnInit() {}

  modifyCuotas(index: number) {
    const cuotas = this.fb.cuotas;
    const gastoAmount = this.fb.form.get('monto').value;

    const totalCuotas = cuotas.length;
    let previousAmount = 0;
    const leftCuotas = totalCuotas - (index + 1);
    if (leftCuotas === 0) {
      return;
    }
    for (let i = 0; i <= index; i++) {
      previousAmount += parseFloat(cuotas.controls[i].value.monto);
    }

    const nextAmount = gastoAmount - previousAmount;
    let nextValue = nextAmount / leftCuotas;
    nextValue = +nextValue.toFixed(2);
    let remainder = nextAmount - nextValue * leftCuotas;
    remainder = +remainder.toFixed(2);
    let j = index + 1;
    for (j; j < totalCuotas; j++) {
      const value = { ...cuotas.controls[j].value, monto: nextValue };
      cuotas.controls[j].setValue(value);
    }

    const lastValue = {
      ...cuotas.controls[j - 1].value,
      monto: nextValue + remainder,
    };
    cuotas.controls[j - 1].setValue(lastValue);
  }
}
