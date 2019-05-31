import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { GastosForm } from './gastos.form';
import { NzMessageService, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd';
import { GastosService } from '@core/http/gastos/gastos.service';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import * as moment from 'moment';
import { KeyEventsPlugin } from '@angular/platform-browser/src/dom/events/key_events';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ProcentualesFormComponent } from 'app/routes/consorcios-profile/profile/tab-porcentuales/procentuales-form/procentuales-form.component';
@Component({
  selector: 'app-gastos-form',
  templateUrl: './gastos-form.component.html',
  styles: [],
})
export class GastosFormComponent implements OnInit {
  protected form: FormGroup;
  @Output() formVisible: EventEmitter<boolean> = new EventEmitter();
  @Input() id: number | undefined;
  @Input() protected valueChange: Subject<{ submit: boolean }>;
  protected cuotasAmount = 1;
  protected cuotas = [];
  protected current = 0;
  protected isLoading = true;
  protected proveedores: { id: number; display: string }[];
  protected consorcios: { id: number; display: string }[];
  protected timeout = null;
  protected keep = { proveedor: false, consorcio: false, gasto: false };
  protected initialized = false;
  constructor(
    protected fb: GastosForm,
    protected msg: NzMessageService,
    protected cdr: ChangeDetectorRef,
    protected gastosService: GastosService,
    protected proveedorService: ProveedoresService,
    protected consorciosService: ConsorciosService,
    protected drawerRef: NzDrawerRef<{ submit: boolean }>,
    protected chequerasService: ProveedoresService,
    protected drawerService: NzDrawerService,
    protected fbBulder: FormBuilder,
    private translate: TranslateService,
  ) {
    this.drawerRef.afterOpen.subscribe(data => {
      this.initialized = true;
    });
  }

  initCuotas(event: any) {
    if (!this.initialized && this.id) {
      return;
    }

    if (!this.cuotasAmount) {
      this.cuotasAmount = 1;
    }
    this.form.setControl('cuotas', this.fb.initCuotasChild(this.cuotasAmount));
    const cuotas = this.form.get('cuotas') as FormArray;

    const gastoAmount = this.form.get('monto').value;
    let total = null;
    const fecha = this.form.get('fecha').value;
    let remainder = 0;
    this.cuotas = [];

    if (gastoAmount) {
      total = parseFloat(gastoAmount) / this.cuotasAmount;
      total = +total.toFixed(2);
      remainder = gastoAmount - total * this.cuotasAmount;
      remainder = +remainder.toFixed(2);
    }
    const fechaValue = fecha ? moment(fecha, 'DD-MM-YYYY') : moment();

    // tslint:disable-next-line: forin
    for (const i in cuotas.controls) {
      const index = parseInt(i, 10);
      if (index > 0) {
        fechaValue.add(1, 'M');
      }
      cuotas.controls[index].setValue({
        monto: i === '0' ? (total + remainder).toFixed(2) : total.toFixed(2),
        fecha_pago: fechaValue.toDate(),
        id: null,
      });
    }

    for (let i = 0; i < this.cuotasAmount; i++) {
      if (i > 0) {
        fechaValue.add(1, 'M');
      }

      this.cuotas.push({
        monto: i === 0 ? (total + remainder).toFixed(2) : total.toFixed(2),
        fecha: fechaValue.toDate(),
      });
    }
  }

  modifyCuotas(index: number) {
    if (!this.initialized && this.id) {
      return;
    }
    const gastoAmount = this.form.get('monto').value;
    const totalCuotas = this.cuotas.length;
    let previousAmount = 0;
    const leftCuotas = totalCuotas - (index + 1);
    if (leftCuotas === 0) {
      return;
    }
    for (let i = 0; i <= index; i++) {
      previousAmount += parseFloat(this.cuotas[i].monto);
    }

    const nextAmount = gastoAmount - previousAmount;
    const nextValue = nextAmount / leftCuotas;

    for (let j = index + 1; j < totalCuotas; j++) {
      this.cuotas[j].monto = nextValue;
    }
  }

  ngOnInit() {
    if (!this.id) {
      this.searchProveedorList('');
      this.searchConsorciosList('');
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
      this.gastosService.find(this.id).subscribe((data: any) => {
        this.searchProveedorList(data.data['proveedor-razon_social']);
        this.searchConsorciosList(data.data['consorcio-display']);
        delete data.data['proveedor-razon_social'];
        delete data.data['consorcio-display'];
        console.log(data.data.cuotas);
        this.form.setValue(data.data);
        this.form.setControl(
          'cuotas',
          this.fb.initCuotasChild(data.data.cuotas.length),
        );

        const cuotas = this.form.get('cuotas') as FormArray;

        // tslint:disable-next-line: forin
        for (const i in cuotas.controls) {
          const index = parseInt(i, 10);
          cuotas.controls[index].setValue({
            monto: data.data.cuotas[index].monto,
            fecha_pago: data.data.cuotas[index].fecha_pago,
            id: data.data.cuotas[index].id,
          });
        }

        // for (const key in data.data.cuotas) {
        //   if (data.data.cuotas.hasOwnProperty(key)) {
        //     data.data.cuotas[key].fecha_pago =  moment(data.data.cuotas[key].fecha_pago, 'DD/MM/YYYY').toDate();
        //   }
        // }
        console.log('form data', data.data);

        console.log('form data', this.form.value);
      });
    } else {
      this.initCuotas(1);
    }
  }

  submit() {
    const proveedor = this.form.value;
    if (proveedor.id) {
      this.gastosService.update(proveedor.id, proveedor).subscribe(data => {
        // this.drawerRef.close({ submit: true });
        this.msg.success(`Actualizado!`);
        this.cdr.detectChanges();
      });
    } else {
      this.gastosService.create(proveedor).subscribe(data => {
        // this.drawerRef.close({ submit: true });

        const proveedorValue: string = this.form.get('id_proveedor').value;
        const consorcioValue: string = this.form.get('id_consorcio').value;
        const gastoValue: string = this.form.get('descripcion').value;
        this.initForm();
        if (this.keep.proveedor) {
          this.form.get('id_proveedor').setValue(proveedorValue);
        }
        if (this.keep.consorcio) {
          this.form.get('id_consorcio').setValue(consorcioValue);
        }
        if (this.keep.gasto) {
          this.form.get('descripcion').setValue(gastoValue);
        }
        this.valueChange.next({ submit: true });
        this.msg.success(`Creado!`);
        this.cdr.detectChanges();
      });
    }
  }

  searchDataForm(timeout = false) {
    const id_proveedor: string = this.form.get('id_proveedor').value;
    const id_consorcio: string = this.form.get('id_consorcio').value;
    const gasto: string = this.form.get('descripcion').value;
    if (id_proveedor == null || id_consorcio == null || gasto == null) {
      return;
    }

    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }

    if (timeout) {
      this.timeout = window.setTimeout(() => {
        this.timeout = null;
        this.gastosService
          .findPrevious({ id_proveedor, id_consorcio, gasto })
          .subscribe(data => {
            if (!data) {
              return;
            }
            this.form.get('id_rubro').setValue(data.id_rubro);
            this.form.get('monto').setValue(data.monto);
            this.form.get('periodicidad').setValue(data.periodicidad);
            this.form.get('prevision').setValue(data.prevision);
            this.form.get('prorrateable').setValue(data.prorrateable);
            this.form.get('fecha').setValue(data.fecha);
            console.log('timeout', data);
          });
      }, 400);
    } else {
      this.gastosService
        .findPrevious({ id_proveedor, id_consorcio, gasto })
        .subscribe(data => {
          if (!data) {
            return;
          }
          this.form.get('id_rubro').setValue(data.id_rubro);
          this.form.get('monto').setValue(data.monto);
          this.form.get('periodicidad').setValue(data.periodicidad);
          this.form.get('prevision').setValue(data.prevision);
          this.form.get('prorrateable').setValue(data.prorrateable);
          this.form.get('fecha').setValue(data.fecha);
          console.log('NO Timeout', data);
        });
    }
  }

  searchProveedores(display: string) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.isLoading = true;
      this.searchProveedorList(display);
    }, 400);
  }

  searchConsorcios(display: string) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.isLoading = true;
      this.searchConsorciosList(display);
    }, 400);
  }

  protected searchProveedorList(display: string) {
    this.proveedorService
      .searchProveedor(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.proveedores = data;
      });
  }

  protected searchConsorciosList(display: string) {
    this.consorciosService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        console.log(data);
        this.consorcios = data;
      });
  }

  protected searchPreviousGasto() {
    // this.gastosService.findPrevious();
  }

  openPorcentualesForm() {
    this.translate.get('Porcentuales').subscribe((res: string) => {
      this.drawerRef = this.drawerService.create<
        ProcentualesFormComponent,
        { id: number }
      >({
        nzTitle: res,
        nzWidth: '50%',
        nzContent: ProcentualesFormComponent,
        nzContentParams: { id: this.form.get('id_consorcio').value },
      });
    });
  }
}
