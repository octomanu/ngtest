import { Component, Input } from '@angular/core';
import { IntermediateSalayForm } from './intermediate-salary.form';
import { SueldosService } from '@core/http/sueldos/sueldos.service';
import { fadeInOut } from '@shared/animations/fade-in-out.animation';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-intermediate-salary-form',
  templateUrl: './intermediate-salary-form.component.html',
  styles: [],
  animations: [fadeInOut],
})
export class IntermediateSalaryFormComponent {
  @Input() idEmpleado: number;
  showAddRow = false;
  currentTab = 0;

  constructor(
    public intermediateSalaryForm: IntermediateSalayForm,
    protected sueldosService: SueldosService,
    protected msgService: NzMessageService,
  ) {}

  addRow() {
    this.intermediateSalaryForm.newHoraExtra();
  }

  chageTab(index) {
    this.showAddRow = index === 1 ? true : false;
  }

  submit() {
    const salary = this.intermediateSalaryForm.getValue(this.idEmpleado);
    this.sueldosService.calculateIntermediate(salary).subscribe(data => {
      this.msgService.success('Calculo realizado');
      console.log(data);
      this.intermediateSalaryForm.preview = data;
      this.currentTab = 2;
    });
  }
}
