import { Component, OnInit } from '@angular/core';
import { IntermediateSalayForm } from '../intermediate-salary.form';

@Component({
  selector: 'app-basic-information-tab-is',
  templateUrl: './basic-information-tab.component.html',
  styles: [],
})
export class BasicInformationTabComponent implements OnInit {
  constructor(public intermediateSalaryForm: IntermediateSalayForm) {}

  ngOnInit() {}
}
