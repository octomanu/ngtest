import { Component, OnInit, Input } from '@angular/core';
import { VacationForm } from './vacation.form';
import { SueldosService } from '@core/http/sueldos/sueldos.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-vacation-form',
  templateUrl: './vacation-form.component.html',
  styles: [],
})
export class VacationFormComponent implements OnInit {
  @Input() idEmpleado;
  currentTab = 0;
  constructor(
    public vacationForm: VacationForm,
    protected sueldosService: SueldosService,
    protected msgService: NzMessageService,
  ) {}

  ngOnInit() {}

  chageTab(index) {}

  submit() {
    const salary = this.vacationForm.getValue(this.idEmpleado);
    this.sueldosService.calculateVacation(salary).subscribe(data => {
      this.msgService.success('Calculo realizado');
      this.vacationForm.preview = data;
      this.currentTab = 2;
    });
  }
}
