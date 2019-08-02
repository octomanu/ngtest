import {
  Output,
  Input,
  EventEmitter,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { CreateUpdateForm as FBuilder } from 'app/interfaces/local/create-update-form.interface';
import { TranslateService } from '@ngx-translate/core';
import { NzDrawerRef, NzMessageService } from 'ng-zorro-antd';
import { CrudService } from '@core/http/crud-service.class';

export class CreateUpdateForm implements OnInit {
  @Output() formVisible: EventEmitter<boolean> = new EventEmitter();
  @Input() id: number | undefined;
  @Input() valueChange: Subject<{ submit: boolean }>;
  form: FormGroup;
  initialized = false;

  constructor(
    protected fb: FBuilder,
    protected msg: NzMessageService,
    protected cdr: ChangeDetectorRef,
    protected drawerRef: NzDrawerRef<{ submit: boolean }>,
    protected translate: TranslateService,
    protected dataService: CrudService,
  ) {
    this.drawerRef.afterOpen.subscribe(data => {
      this.initialized = true;
    });
  }

  ngOnInit() {
    this.initForm();

    if (this.id) {
      this.dataService.find(this.id).subscribe((data: any) => {
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
    this.dataService.create(formData).subscribe(data => {
      this.initForm();
      this.valueChange.next({ submit: true });
      this.msg.success(`Creado!`);
      this.cdr.detectChanges();
    });
  }

  update() {
    const formData = this.form.value;
    this.dataService.update(formData.id, formData).subscribe(data => {
      this.msg.success(`Actualizado!`);
      this.valueChange.next({ submit: true });
      this.cdr.detectChanges();
    });
  }
}
