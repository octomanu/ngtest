import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { CabecerasService } from '@core/http/cabeceras/cabeceras.service';
import { TranslateService } from '@ngx-translate/core';
import { NzDrawerRef, NzMessageService } from 'ng-zorro-antd';
import { CabecerasForm } from './cabeceras.form';

@Component({
  selector: 'app-cabeceras-form',
  templateUrl: './cabeceras-form.component.html',
  styles: [],
})
export class CabecerasFormComponent implements OnInit {
  @Output() formVisible: EventEmitter<boolean> = new EventEmitter();
  @Input() id: number | undefined;
  @Input() valueChange: Subject<{ submit: boolean }>;
  protected form: FormGroup;
  protected initialized = false;
  constructor(
    protected fb: CabecerasForm,
    protected msg: NzMessageService,
    protected cdr: ChangeDetectorRef,
    protected drawerRef: NzDrawerRef<{ submit: boolean }>,
    protected fbBulder: FormBuilder,
    protected translate: TranslateService,
    protected cabecerasService: CabecerasService,
  ) {
    this.drawerRef.afterOpen.subscribe(data => {
      this.initialized = true;
    });
  }

  ngOnInit() {
    this.initForm();

    if (this.id) {
      this.cabecerasService.find(this.id).subscribe((data: any) => {
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
      this.cabecerasService.update(formData.id, formData).subscribe(data => {
        this.msg.success(`Actualizado!`);
        this.cdr.detectChanges();
      });
    } else {
      this.cabecerasService.create(formData).subscribe(data => {
        this.initForm();
        this.valueChange.next({ submit: true });
        this.msg.success(`Creado!`);
        this.cdr.detectChanges();
      });
    }
  }
}
