import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NzDrawerRef, NzMessageService } from 'ng-zorro-antd';
import { FormGroup } from '@angular/forms';
import { UnidadesFuncionalesForm } from './unidades-funcionales.form';
import { UnidadesFuncionalesService } from '@core/http/unidades-funcionales/unidades-funcionales.service';
import { unlink } from 'fs';

@Component({
  selector: 'app-unidades-funcionales-form',
  templateUrl: './unidades-funcionales-form.component.html',
  styles: [],
})
export class UnidadesFuncionalesFormComponent implements OnInit {
  protected form: FormGroup;
  @Output() formVisible: EventEmitter<boolean> = new EventEmitter();
  @Input() id: number | undefined;
  @Input() idConsorcio: string;
  tipoUf = ['departamento', 'cochera', 'local', 'porteria', 'baulera', 'unidad_complementaria', 'azotea', 'S.U.M.', 'CAMA', 'SS', 'lotes'];
  tipoPerdonInteres = ['perpetua', 'actual'];
  estadoLegal =  ['abogado', 'acuerdo', 'juicio'];

  constructor(
    protected fb: UnidadesFuncionalesForm,
    protected msg: NzMessageService,
    protected cdr: ChangeDetectorRef,
    protected unidadesFuncionalesService: UnidadesFuncionalesService,
    protected drawerRef: NzDrawerRef<{ submit: boolean }>,
  ) {}

  ngOnInit() {
    this.unidadesFuncionalesService.setConsorcio(this.idConsorcio);
    this.open();
  }

  initForm() {
    this.form = this.fb.getForm();
  }

  open() {
    this.initForm();
    this.formVisible.emit(true);
    if (this.id) {
      this.unidadesFuncionalesService.find(this.id).subscribe((data: any) => {
        this.form.setValue(data.data);
      });
    }
  }

  submit() {
    const formValue = this.form.value;
    formValue.id_consorcio = this.idConsorcio;
    if (formValue.id) {
      this.unidadesFuncionalesService
        .update(formValue.id, formValue)
        .subscribe(data => {
          this.drawerRef.close({ submit: true });
          this.msg.success(`Actualizado!`);
          this.cdr.detectChanges();
        });
    } else {
      this.unidadesFuncionalesService.create(formValue).subscribe(data => {
        this.drawerRef.close({ submit: true });
        this.msg.success(`Creado!`);
        this.cdr.detectChanges();
      });
    }
  }
}
