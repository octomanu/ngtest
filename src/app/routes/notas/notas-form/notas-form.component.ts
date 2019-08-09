import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { NotasForm } from './notas.form';
import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { NotasService } from '@core/http/notas/notas.service';
import * as moment from 'moment';

@Component({
  selector: 'app-notas-form',
  templateUrl: './notas-form.component.html',
  styles: [],
})
export class NotasFormComponent implements OnInit {
  form: FormGroup;
  @Output() formVisible: EventEmitter<boolean> = new EventEmitter();
  @Input() id: number | undefined;
  @Input() valueChange: Subject<{ submit: boolean }>;
  protected initialized = false;
  constructor(
    protected fb: NotasForm,
    protected msg: NzMessageService,
    protected cdr: ChangeDetectorRef,
    protected drawerRef: NzDrawerRef<{ submit: boolean }>,
    protected fbBulder: FormBuilder,
    protected translate: TranslateService,
    protected notasService: NotasService,
  ) {
    this.drawerRef.afterOpen.subscribe(data => {
      this.initialized = true;
    });
  }

  ngOnInit() {
    this.initForm();

    if (this.id) {
      this.notasService.find(this.id).subscribe((nota: any) => {
        this.form.setValue(nota);
      });
    }
  }

  initForm() {
    this.form = this.fb.getForm();
  }

  submit() {
    const formData = { ...this.form.value };
    formData.fecha_limite = moment(formData.fecha_limite).format('DD-MM-YYYY');
    if (formData.id) {
      this.notasService.update(formData.id, formData).subscribe(data => {
        this.msg.success(`Actualizado!`);
        this.cdr.detectChanges();
      });
    } else {
      this.notasService.create(formData).subscribe(data => {
        this.initForm();
        this.valueChange.next({ submit: true });
        this.msg.success(`Creado!`);
        this.cdr.detectChanges();
      });
    }
  }
}
