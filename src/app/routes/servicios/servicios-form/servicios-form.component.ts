import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { ServiciosService } from '@core/http/servicios/servicios.service';
import { ServiciosForm } from './servicios.form';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { GlobalState } from 'redux/global/globa.reducer';

@Component({
  selector: 'app-servicios-form',
  templateUrl: './servicios-form.component.html',
  styles: [],
})
export class ServiciosFormComponent implements OnInit {
  @Output() formVisible: EventEmitter<boolean> = new EventEmitter();
  @Input() id: number | undefined;
  @Input() valueChange: Subject<{ submit: boolean }>;
  form: FormGroup;
  constructor(
    protected store: Store<AppState>,
    protected fb: ServiciosForm,
    protected msg: NzMessageService,
    protected cdr: ChangeDetectorRef,
    protected drawerRef: NzDrawerRef<{ submit: boolean }>,
    protected fbBulder: FormBuilder,
    protected serviciosService: ServiciosService,
  ) {}

  ngOnInit() {
    this.initForm();

    this.store.select('globalState').subscribe((state: GlobalState) => {
      this.drawerRef.nzWidth = state.smallViewport ? '100%' : '75%';
    });

    if (this.id) {
      this.serviciosService.find(this.id).subscribe((data: any) => {
        this.form.setValue(data.data);
      });
    }
  }

  initForm() {
    this.form = this.fb.getForm();
  }

  submit() {
    if (this.form.value.id) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    const formData = this.form.value;
    this.serviciosService.create(formData).subscribe(data => {
      this.initForm();
      this.valueChange.next({ submit: true });
      this.msg.success(`Creado!`);
      this.cdr.detectChanges();
    });
  }

  update() {
    const formData = this.form.value;
    this.serviciosService.update(formData.id, formData).subscribe(data => {
      this.msg.success(`Actualizado!`);
      this.valueChange.next({ submit: true });
      this.cdr.detectChanges();
    });
  }
}
