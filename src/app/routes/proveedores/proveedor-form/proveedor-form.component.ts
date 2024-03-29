import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { ProveedorForm } from './proveedor.form';
import { ProvinciasFinderService } from 'app/routes/services/type-ahead/provincias-finder/provincias-finder.service';

@Component({
  selector: 'app-proveedor-form',
  templateUrl: './proveedor-form.component.html',
  styles: [],
})
export class ProveedorFormComponent implements OnInit {
  form: FormGroup;
  readonly situacionesFiscales = [
    {
      key: 'responsable_no_inscripto',
      value: 'global.responsable_no_inscripto',
    },
    { key: 'responsable_inscripto', value: 'global.responsable_no_inscripto' },
    { key: 'monotributista', value: 'global.responsable_no_inscripto' },
    { key: 'exento', value: 'global.exento' },
  ];

  @Output() formVisible: EventEmitter<boolean> = new EventEmitter();
  @Input() id: number | undefined;

  constructor(
    protected fb: ProveedorForm,
    protected msg: NzMessageService,
    protected cdr: ChangeDetectorRef,
    protected proveedorService: ProveedoresService,
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
      this.proveedorService.find(this.id).subscribe((data: any) => {
        this.form.setValue(data);
      });
    }
  }

  submit() {
    const proveedor = this.form.value;
    if (proveedor.id) {
      this.proveedorService.update(proveedor.id, proveedor).subscribe(data => {
        this.drawerRef.close({ submit: true });
        this.msg.success(`Actualizado!`);
        this.cdr.detectChanges();
      });
    } else {
      this.proveedorService.create(proveedor).subscribe(data => {
        this.drawerRef.close({ submit: true });
        this.msg.success(`Creado!`);
        this.cdr.detectChanges();
      });
    }
  }
}
