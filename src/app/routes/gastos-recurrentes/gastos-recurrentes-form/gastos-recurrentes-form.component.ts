import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { NzMessageService, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd';
import { GastosRecurrentesForm } from './gastos-recurrentes.form';
import { TranslateService } from '@ngx-translate/core';
import { ProveedoresService } from '@core/http/proveedores/proveedores.service';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { GastosRecurrentesService } from '@core/http/gastos-recurrentes/gastos-recurrentes.service';
import { PorcentajesConsorciosService } from '@core/http/porcentajes_consorcios/porcentajes-consorcios.service';

@Component({
  selector: 'app-gastos-recurrentes-form',
  templateUrl: './gastos-recurrentes-form.component.html',
  styles: [],
})
export class GastosRecurrentesFormComponent implements OnInit {
  protected form: FormGroup;
  @Output() formVisible: EventEmitter<boolean> = new EventEmitter();
  @Input() id: number | undefined;
  @Input() protected valueChange: Subject<{ submit: boolean }>;
  protected initialized = false;
  // data selects
  protected timeout = null;
  protected isLoading = true;
  protected proveedores: { id: number; display: string }[];
  protected consorcios: { id: number; display: string }[];
  protected porcentajes: { id: number; display: string }[];
  // data selects

  constructor(
    protected fb: GastosRecurrentesForm,
    protected msg: NzMessageService,
    protected cdr: ChangeDetectorRef,
    protected drawerRef: NzDrawerRef<{ submit: boolean }>,
    protected fbBulder: FormBuilder,
    protected translate: TranslateService,
    protected proveedorService: ProveedoresService,
    protected consorciosService: ConsorciosService,
    protected gastosRecurrentesService: GastosRecurrentesService,
    protected porcentajesService: PorcentajesConsorciosService,
  ) {
    this.drawerRef.afterOpen.subscribe(data => {
      this.initialized = true;
    });
  }

  ngOnInit() {
    this.initForm();
    this.searchProveedorList('');
    this.searchConsorciosList('');

    if (this.id) {
      this.gastosRecurrentesService.find(this.id).subscribe((data: any) => {
        this.form.setValue(data.data);
      });
    }
  }

  initForm() {
    this.form = this.fb.getForm();
  }

  submit() {
    const formData = this.form.value;
    if (formData.id) {
      this.gastosRecurrentesService
        .update(formData.id, formData)
        .subscribe(data => {
          this.msg.success(`Actualizado!`);
          this.cdr.detectChanges();
        });
    } else {
      this.gastosRecurrentesService.create(formData).subscribe(data => {
        // this.drawerRef.close({ submit: true });
        this.initForm();
        this.valueChange.next({ submit: true });
        this.msg.success(`Creado!`);
        this.cdr.detectChanges();
      });
    }
  }

  changeConsorcio() {
    const idConsorcio: string = this.form.get('id_consorcio').value;
    this.porcentajesService.setConsorcio(idConsorcio);
    this.form.get('id_porcentaje_consorcio').setValue(null);
    if (idConsorcio) {
      this.searchPorcentajesList('');
    } else {
      this.porcentajes = [];
    }
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

  searchPorcentajes(display: string) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.isLoading = true;
      this.searchPorcentajesList(display);
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
        this.consorcios = data;
      });
  }

  protected searchPorcentajesList(display: string) {
    this.porcentajesService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.porcentajes = data;
      });
  }
}
