import { Component, OnInit, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SueldosService } from '@core/http/sueldos/sueldos.service';
import { SacForm } from './sac.form';
import { fadeInOut } from '@shared/animations/fade-in-out.animation';

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
  ) {}

  addRow() {
    this.sacForm.newHoraExtra();
  }

  chageTab(index) {
    this.showAddRow = index === 1 ? true : false;
  }

  submit() {
    const salary = this.sacForm.getValue(this.idEmpleado);
    this.sueldosService.calculateSac(salary).subscribe(data => {
      this.msgService.success('Calculo realizado');
      console.log(data);
      this.sacForm.preview = data;
      this.currentTab = 2;
    });
  }
}
