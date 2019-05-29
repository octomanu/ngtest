import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FiltroForm } from '../periodos-table/filtro.form';
import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-periodos-table-filter',
  templateUrl: './periodos-table-filter.component.html',
  styles: []
})
export class PeriodosTableFilterComponent implements OnInit {
  form: FormGroup;
  @Input() formInput: { consorcio: string, };

  constructor(
    private filtroForm: FiltroForm,
    private drawerRef: NzDrawerRef<{
      consorcio: string
    }>,
  ) {}

  ngOnInit() {
    console.log('sc');
    this.form = this.filtroForm.getForm();
    this.form.setValue(this.formInput);
  }

  submit() {
    this.drawerRef.close(this.form.value);
  }
}
