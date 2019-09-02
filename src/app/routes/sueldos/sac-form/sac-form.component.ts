import { Component, OnInit, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SueldosService } from '@core/http/sueldos/sueldos.service';
import { SacForm } from './sac.form';
import { fadeInOut } from '@shared/animations/fade-in-out.animation';
import { LoadSueldosAction } from 'redux/sueldos/sueldos.actions';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sac-form',
  templateUrl: './sac-form.component.html',
  styles: [],
  animations: [fadeInOut],
})
export class SacFormComponent {
  @Input() idEmpleado: number;
  showAddRow = false;
  currentTab = 0;

  constructor(
    public sacForm: SacForm,
    protected sueldosService: SueldosService,
    protected msgService: NzMessageService,
    protected store: Store<AppState>,
  ) {}

  addRow() {
    this.sacForm.newHoraExtra();
  }

  chageTab(index) {
    this.showAddRow = index === 1 ? true : false;
  }

  save() {
    const salary = this.sacForm.getValue(this.idEmpleado);
    this.sueldosService.saveSac(salary).subscribe(data => {
      this.msgService.success('SAC guardado');
      this.sacForm.initForm();
      this.currentTab = 0;
      this.store.dispatch(new LoadSueldosAction());
    });
  }

  submit() {
    const salary = this.sacForm.getValue(this.idEmpleado);
    this.sueldosService.calculateSac(salary).subscribe(data => {
      this.msgService.success('Calculo realizado');
      this.sacForm.preview = data;
      this.currentTab = 2;
    });
  }
}
