import { Component, OnInit } from '@angular/core';
import { SalayForm } from '../salary.form';

@Component({
  selector: 'app-basic-information-tab',
  templateUrl: './basic-information-tab.component.html',
  styles: [],
})
export class BasicInformationTabComponent implements OnInit {
  constructor(public salaryForm: SalayForm) {}

  ngOnInit() {}
}
