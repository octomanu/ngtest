import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { ConsorcioForm } from './consorcio.form';
import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { FormGroup } from '@angular/forms';
import { ProvinciasFinderService } from 'app/routes/services/type-ahead/provincias-finder/provincias-finder.service';

@Component({
  selector: 'app-consorcio-form',
  templateUrl: './consorcio-form.component.html',
  styles: [],
})
export class ConsorcioFormComponent implements OnInit {
  form: FormGroup;
  @Output() formVisible: EventEmitter<boolean> = new EventEmitter();
  @Input() id: number | undefined;
  current = 0;
  consorcioStatus = ['ACTIVO', 'PENDIENTE', 'INACTIVO', 'BORRADO'];

  constructor(
    protected fb: ConsorcioForm,
    protected msg: NzMessageService,
    protected cdr: ChangeDetectorRef,
    protected consorciosService: ConsorciosService,
    protected drawerRef: NzDrawerRef<{ submit: boolean }>,
    public provincias: ProvinciasFinderService,
  ) {}

  ngOnInit() {
    this.open();
  }

  initForm() {
    this.form = this.fb.getForm();
  }

  open() {
    this.initForm();
    this.formVisible.emit(true);
    if (this.id) {
      this.consorciosService.find(this.id).subscribe((data: any) => {
        this.form.setValue(data);
      });
    }
  }

  submit() {
    const proveedor = this.form.value;
    if (proveedor.id) {
      this.consorciosService.update(proveedor.id, proveedor).subscribe(data => {
        this.drawerRef.close({ submit: true });
        this.msg.success(`Actualizado!`);
        this.cdr.detectChanges();
      });
    } else {
      this.consorciosService.create(proveedor).subscribe(data => {
        this.drawerRef.close({ submit: true });
        this.msg.success(`Creado!`);
        this.cdr.detectChanges();
      });
    }
  }

  getNzColor(status: string) {
    switch (status) {
      case 'PENDIENTE':
        return 'processing';
      case 'ACTIVO':
        return 'success';
      case 'INACTIVO':
        return 'warning';
      case 'BORRADO':
        return 'error';
      default:
        return 'default';
    }
  }
}
