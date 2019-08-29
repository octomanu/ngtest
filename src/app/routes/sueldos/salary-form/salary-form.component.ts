import { Component, Input } from '@angular/core';
import { SalayForm } from './salary.form';
import { SueldosService } from '@core/http/sueldos/sueldos.service';
import { NzMessageService } from 'ng-zorro-antd';
import { fadeInOut } from '@shared/animations/fade-in-out.animation';

@Component({
  selector: 'app-salary-form',
  templateUrl: './salary-form.component.html',
  styles: [],
  animations: [fadeInOut],
})
export class SalaryFormComponent {
  @Input() idEmpleado: number;
  public showAddRow = false;
  public currentTab = 0;

  constructor(
    public salaryForm: SalayForm,
    protected sueldosService: SueldosService,
    protected msgService: NzMessageService,
  ) {}

  addRow() {
    this.salaryForm.newHoraExtra();
  }

  chageTab(index) {
    this.showAddRow = index === 2 ? true : false;
  }

  submit() {
    const salary = this.salaryForm.buildSalary(this.idEmpleado);
    this.sueldosService.calculateSalary(salary).subscribe(data => {
      this.msgService.success('Calculo realizado');
      this.salaryForm.preview = data;
      this.currentTab = 3;
    });
  }
}
