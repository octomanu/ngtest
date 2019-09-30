import { Component, OnInit } from '@angular/core';
import { PorcentajesConsorciosService } from '@core/http/porcentajes_consorcios/porcentajes-consorcios.service';
import { GastosForm } from '../../forms/gastos.form';

@Component({
  selector: 'app-porcentuales',
  templateUrl: './porcentuales.component.html',
  styles: [],
})
export class PorcentualesComponent implements OnInit {
  porcentajes: { id: number; display: string }[] = [];
  constructor(
    public fb: GastosForm,
    protected porcentajesService: PorcentajesConsorciosService,
  ) {}

  ngOnInit() {}
}
