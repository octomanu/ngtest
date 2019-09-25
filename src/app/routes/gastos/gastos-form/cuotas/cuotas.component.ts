import { Component } from '@angular/core';
import { GastosForm } from '../../forms/gastos.form';
@Component({
  selector: 'app-cuotas',
  templateUrl: './cuotas.component.html',
  styles: [],
})
export class CuotasComponent {
  constructor(protected fb: GastosForm) {}

  modifyCuotas(index: number) {
    const {
      cuotas,
      totalCuotas,
      leftCuotas,
      nextValue,
      remainder,
    } = this.getValues(index);

    if (leftCuotas === 0) return;

    cuotas.controls[totalCuotas - 1].setValue({
      ...cuotas.controls[totalCuotas - 1].value,
      monto: nextValue + remainder,
    });

    for (let j = index + 1; j < totalCuotas; j++) {
      cuotas.controls[j].setValue({
        ...cuotas.controls[j].value,
        monto: nextValue,
      });
    }
  }

  private getAmountOfPreviousCuotas(index: number) {
    const cuotas = this.fb.cuotas;
    let previousAmount = 0;
    for (let i = 0; i <= index; i++) {
      previousAmount += parseFloat(cuotas.controls[i].value.monto);
    }
    return previousAmount;
  }

  private getValues(index: number) {
    const gastoAmount = this.fb.form.get('monto').value;
    const cuotas = this.fb.cuotas;
    const totalCuotas = cuotas.length;
    const leftCuotas = totalCuotas - (index + 1);
    const previousAmount = this.getAmountOfPreviousCuotas(index);
    const nextAmount = gastoAmount - previousAmount;
    const nextValue = +(nextAmount / leftCuotas).toFixed(2);
    const remainder = +(nextAmount - nextValue * leftCuotas).toFixed(2);
    return {
      cuotas,
      totalCuotas,
      leftCuotas,
      nextValue,
      remainder,
    };
  }
}
