import { Component, OnInit } from '@angular/core';
import { VacationForm } from '../vacation.form';

@Component({
  selector: 'app-basic-information-tab-vacation',
  templateUrl: './basic-information-tab.component.html',
  styles: [],
})
export class BasicInformationTabComponent implements OnInit {
  constructor(public vacationForm: VacationForm) {}

  ngOnInit() {}
}
