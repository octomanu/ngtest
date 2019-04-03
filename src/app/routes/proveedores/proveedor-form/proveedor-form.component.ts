import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { ProveedorForm } from './proveedor.form';

@Component({
  selector: 'app-proveedor-form',
  templateUrl: './proveedor-form.component.html',
  styles: [],
})
export class ProveedorFormComponent implements OnInit {
  
  form: FormGroup;
  visible: boolean;
  @Output() formVisible: EventEmitter<boolean> = new EventEmitter();
  @Output() formSubmit: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private fb: ProveedorForm,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private proveedorService: ProveedoresService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  open(id?: number) {
    this.initForm();
    this.visible = true;
    this.formVisible.emit(true);
    if (id) {
      this.proveedorService.buscarProveedor(id).subscribe(data => {
        this.form.setValue(data);
      });
    }
  }

  close() {
    this.visible = false;
    this.formVisible.emit(false);
  }

  submit() {
    const proveedor = this.form.value;
    if (proveedor.id) {
      this.proveedorService
        .actualizarProveedor(proveedor.id, proveedor)
        .subscribe(data => {
          this.formSubmit.emit(true);
          this.msg.success(`Actualizado!!`);
          this.cdr.detectChanges();
          this.close();
        });
    } else {
      this.proveedorService.crearProveedor(proveedor).subscribe(data => {
        this.formSubmit.emit(true);
        this.msg.success(`Creado!!`);
        this.cdr.detectChanges();
        this.close();
      });
    }
  }

  initForm() {
    this.form = this.fb.getForm();
  }
}
