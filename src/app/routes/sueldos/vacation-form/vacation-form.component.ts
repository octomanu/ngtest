import { Component, Input } from '@angular/core';
import { VacationForm } from './vacation.form';
import { SueldosService } from '@core/http/sueldos/sueldos.service';
import { NzMessageService } from 'ng-zorro-antd';
import { fadeInOut } from '@shared/animations/fade-in-out.animation';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { LoadSueldosAction } from 'redux/sueldos/sueldos.actions';

@Component({
  selector: 'app-vacation-form',
  templateUrl: './vacation-form.component.html',
  styles: [],
  animations: [fadeInOut],
})
export class VacationFormComponent {
  @Input() idEmpleado;
  currentTab = 0;
  constructor(
    public vacationForm: VacationForm,
    protected sueldosService: SueldosService,
    protected msgService: NzMessageService,
    protected store: Store<AppState>,
  ) {}

  save() {
    const salary = this.vacationForm.getValue(this.idEmpleado);
    this.sueldosService.saveVacation(salary).subscribe(data => {
      this.msgService.success('Vacacion guardada');
      this.currentTab = 0;
      this.vacationForm.initForm();
      this.store.dispatch(new LoadSueldosAction());
    });
  }

  submit() {
    const salary = this.vacationForm.getValue(this.idEmpleado);
    this.sueldosService.calculateVacation(salary).subscribe(data => {
      this.msgService.success('Calculo realizado');
      this.vacationForm.preview = data;
      this.currentTab = 2;
    });
  }
}
