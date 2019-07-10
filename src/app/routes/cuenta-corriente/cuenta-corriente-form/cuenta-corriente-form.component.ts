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
import { CuentaCorrienteForm } from './cuenta-corriente.form';
import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { MovimientosService } from '@core/http/movimientos/movimientos.service';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';

@Component({
  selector: 'app-cuenta-corriente-form',
  templateUrl: './cuenta-corriente-form.component.html',
  styles: [],
})
export class CuentaCorrienteFormComponent implements OnInit {
  form: FormGroup;
  @Output() formVisible: EventEmitter<boolean> = new EventEmitter();
  @Input() id: number | undefined;
  @Input() valueChange: Subject<{ submit: boolean }>;
  protected initialized = false;
  // data selects
  protected timeout = null;
  protected isLoading = true;
  protected consorcios: { id: number; display: string }[];
  // data selects

  constructor(
    protected fb: CuentaCorrienteForm,
    protected msg: NzMessageService,
    protected cdr: ChangeDetectorRef,
    protected drawerRef: NzDrawerRef<{ submit: boolean }>,
    protected fbBulder: FormBuilder,
    protected translate: TranslateService,
    protected movimientosService: MovimientosService,
    protected consorciosService: ConsorciosService,
  ) {
    this.drawerRef.afterOpen.subscribe(data => {
      this.initialized = true;
    });
  }

  ngOnInit() {
    this.form = this.fb.getForm();
    this.searchConsorciosList('');
  }

  initForm() {
    this.form = this.fb.getForm();
  }

  submit() {
    const formData = this.form.value;
    this.movimientosService.create(formData).subscribe(data => {
      // this.drawerRef.close({ submit: true });
      this.initForm();
      this.valueChange.next({ submit: true });
      this.msg.success(`Creado!`);
      this.cdr.detectChanges();
    });
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

  protected searchConsorciosList(display: string) {
    this.consorciosService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.consorcios = data;
      });
  }
}
