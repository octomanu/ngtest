import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AmenitiesForm } from './amenities.form';
import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { AmenitiesService } from '@core/http/amenities/amenities.service';

@Component({
  selector: 'app-amenities-form',
  templateUrl: './amenities-form.component.html',
  styles: [],
})
export class AmenitiesFormComponent implements OnInit {
  form: FormGroup;
  @Output() formVisible: EventEmitter<boolean> = new EventEmitter();
  @Input() id: number | undefined;
  @Input() idConsorcio: string;
  constructor(
    protected fb: AmenitiesForm,
    protected msg: NzMessageService,
    protected cdr: ChangeDetectorRef,
    protected amenitiesService: AmenitiesService,
    protected drawerRef: NzDrawerRef<{ submit: boolean }>,
  ) {}

  ngOnInit() {
    this.amenitiesService.setConsorcio(this.idConsorcio);
    this.open();
  }

  initForm() {
    this.form = this.fb.getForm();
  }

  open() {
    this.initForm();
    this.formVisible.emit(true);
    if (this.id) {
      this.amenitiesService.find(this.id).subscribe((data: any) => {
        this.form.setValue(data.data);
      });
    }
  }

  submit() {
    const formValue = this.form.value;
    formValue.id_consorcio = this.idConsorcio;
    if (formValue.id) {
      this.amenitiesService.update(formValue.id, formValue).subscribe(data => {
        this.drawerRef.close({ submit: true });
        this.msg.success(`Actualizado!`);
        this.cdr.detectChanges();
      });
    } else {
      this.amenitiesService.create(formValue).subscribe(data => {
        this.drawerRef.close({ submit: true });
        this.msg.success(`Creado!`);
        this.cdr.detectChanges();
      });
    }
  }
}
