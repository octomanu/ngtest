import { Component, OnInit, Input } from '@angular/core';
import { ChequesTercerosForm } from './cheques-terceros.form';
import { FormGroup } from '@angular/forms';
import { NzDrawerRef, NzMessageService } from 'ng-zorro-antd';
import { ChequesTercerosService } from '@core/http/cheques-terceros.service';
import * as moment from 'moment';

@Component({
  selector: 'app-cheques-terceros-form',
  templateUrl: './cheques-terceros-form.component.html',
  styles: [],
})
export class ChequesTercerosFormComponent implements OnInit {
  @Input() id: number | undefined;
  form: FormGroup;
  constructor(
    protected fb: ChequesTercerosForm,
    protected msg: NzMessageService,
    protected drawerRef: NzDrawerRef<{ submit: boolean }>,
    protected chequesTercerosService: ChequesTercerosService,
  ) {}

  ngOnInit() {
    this.initForm();
    if (this.id) {
      this.chequesTercerosService.find(this.id).subscribe((data: any) => {
        this.form.setValue(data);
      });
    }
  }

  initForm() {
    this.form = this.fb.getForm();
  }

  submit() {
    const formData = { ...this.form.value };
    formData.fecha_vencimiento = moment(formData.fecha_vencimiento).format(
      'DD-MM-YYYY',
    );
    if (this.form.value.id) {
      this.update(formData);
    } else {
      this.create(formData);
    }
  }

  create(formData) {
    this.chequesTercerosService.create(formData).subscribe(data => {
      this.initForm();
      this.msg.success(`Creado!`);
    });
  }

  update(formData) {
    this.chequesTercerosService
      .update(formData.id, formData)
      .subscribe(data => {
        this.msg.success(`Actualizado!`);
      });
  }
}
