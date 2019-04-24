import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { ProveedorForm } from './proveedor.form';

@Component({
  selector: 'app-proveedor-form',
  templateUrl: './proveedor-form.component.html',
  styles: [],
})
export class ProveedorFormComponent implements OnInit {
  protected form: FormGroup;
  @Output() formVisible: EventEmitter<boolean> = new EventEmitter();
  @Input() id: number | undefined;

  constructor(
    protected fb: ProveedorForm,
    protected msg: NzMessageService,
    protected cdr: ChangeDetectorRef,
    protected proveedorService: ProveedoresService,
    protected drawerRef: NzDrawerRef<{ submit: boolean }>,
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
    console.log(this.id);
    if (this.id) {
      this.proveedorService.buscarProveedor(this.id).subscribe(data => {
        console.log(data);
        this.form.setValue(data);
      });
    }
  }

  submit() {
    const proveedor = this.form.value;
    if (proveedor.id) {
      this.proveedorService
        .actualizarProveedor(proveedor.id, proveedor)
        .subscribe(data => {
          this.drawerRef.close({ submit: true });
          this.msg.success(`Actualizado!`);
          this.cdr.detectChanges();
        });
    } else {
      this.proveedorService.crearProveedor(proveedor).subscribe(data => {
        this.drawerRef.close({ submit: true });
        this.msg.success(`Creado!`);
        this.cdr.detectChanges();
      });
    }
  }
}
