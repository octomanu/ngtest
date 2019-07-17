import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PorcentualesForm } from './porcentuales.form';
import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { PorcentajesConsorciosService } from '@core/http/porcentajes_consorcios/porcentajes-consorcios.service';

@Component({
  selector: 'app-procentuales-form',
  templateUrl: './procentuales-form.component.html',
  styles: [],
})
export class ProcentualesFormComponent implements OnInit {
  tipos = ['gastos', 'fijo', 'fijo_forzado'];
  form: FormGroup;
  @Output() formVisible: EventEmitter<boolean> = new EventEmitter();
  @Input() id: number | undefined;
  @Input() idConsorcio: string;

  constructor(
    protected fb: PorcentualesForm,
    protected msg: NzMessageService,
    protected cdr: ChangeDetectorRef,
    protected porcentajesConsorciosService: PorcentajesConsorciosService,
    protected drawerRef: NzDrawerRef<{ submit: boolean }>,
  ) {}

  ngOnInit() {
    this.open();
    this.porcentajesConsorciosService.setConsorcio(this.idConsorcio);
  }

  initForm() {
    this.form = this.fb.getForm();
  }

  open() {
    this.initForm();
    this.formVisible.emit(true);
    if (this.id) {
      this.porcentajesConsorciosService.find(this.id).subscribe((data: any) => {
        this.form.setValue(data.data);
      });
    }
  }

  submit() {
    const proveedor = this.form.value;
    if (proveedor.id) {
      this.porcentajesConsorciosService.update(proveedor.id, proveedor).subscribe(data => {
        this.drawerRef.close({ submit: true });
        this.msg.success(`Actualizado!`);
        this.cdr.detectChanges();
      });
    } else {
      this.porcentajesConsorciosService.create(proveedor).subscribe(data => {
        this.drawerRef.close({ submit: true });
        this.msg.success(`Creado!`);
        this.cdr.detectChanges();
      });
    }
  }
}
