import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ChequesForm } from './cheques.form';
import { NzMessageService, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd';
import { ChequesService } from '@core/http/cheques/cheques.service';
import { ChequerasService } from '@core/http/chequeras/chequeras.service';
import { ConfigFormComponent } from './config-form/config-form.component';

@Component({
  selector: 'app-cheques-form',
  templateUrl: './cheques-form.component.html',
  styles: [],
})
export class ChequesFormComponent implements OnInit {
  protected form: FormGroup;
  @Output() formVisible: EventEmitter<boolean> = new EventEmitter();
  @Input() id: number | undefined;
  protected current = 0;
  protected isLoading = true;
  protected checkbooks: { id: number; display: string }[];
  protected timeout = null;
  protected keepData = {
    cruzado: false,
    a_la_orden: false,
    id_chequera: false,
    fecha_deposito: false,
    fecha_emision: false,
    monto: false,
    numero: false,
  };

  constructor(
    protected fb: ChequesForm,
    protected msg: NzMessageService,
    protected cdr: ChangeDetectorRef,
    protected chequesService: ChequesService,
    protected drawerRef: NzDrawerRef<{ submit: boolean }>,
    protected chequerasService: ChequerasService,
    protected drawerService: NzDrawerService,
  ) {}

  ngOnInit() {
    if (!this.id) {
      this.getCheckbooksList('');
    }

    this.open();
  }

  initForm() {
    this.form = this.fb.getForm();
  }

  open() {
    this.initForm();
    this.formVisible.emit(true);
    if (this.id) {
      this.chequesService.find(this.id).subscribe((data: any) => {
        this.form.setValue(data.data);
      });
    }
  }

  submit() {
    const proveedor = this.form.value;
    if (proveedor.id) {
      this.chequesService.update(proveedor.id, proveedor).subscribe(data => {
        this.drawerRef.close({ submit: true });
        this.msg.success(`Actualizado!`);
        this.cdr.detectChanges();
      });
    } else {
      this.chequesService.create(proveedor).subscribe(data => {
        // this.drawerRef.close({ submit: true });
        this.keepFormData();
        this.msg.success(`Creado!`);
        this.cdr.detectChanges();
      });
    }
  }

  searchCheckbooks(display: string) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.isLoading = true;
      this.getCheckbooksList(display);
    }, 400);
  }

  _openFilter() {
    const drawerConfigForm = this.drawerService.create<ConfigFormComponent>({
      nzTitle: 'lambe.proveedores.titulo',
      nzContent: ConfigFormComponent,
      nzContentParams: { keepData: this.keepData },
    });

    drawerConfigForm.afterClose.subscribe((data: any) => {
      if (data) {
        this.keepData = data;
      }
    });
  }

  protected keepFormData() {
    const data = this.form.value;
    let closeDrawer = true;
    this.initForm();

    for (const key in data) {
      if (this.keepData[key]) {
        closeDrawer = false;
        this.form.get(key).setValue(data[key]);
      }
    }

    if (closeDrawer) {
      this.drawerRef.close({ submit: true });
      this.cdr.detectChanges();
    }
  }

  protected getCheckbooksList(display: string) {
    this.chequerasService
      .searchCheckbook(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.checkbooks = data;
      });
  }
}
