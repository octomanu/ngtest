import { Component } from '@angular/core';
import { SalayForm } from '../salary.form';

@Component({
  selector: 'app-contributions-tab',
  templateUrl: './contributions-tab.component.html',
  styles: [],
})
export class ContributionsTabComponent {
  constructor(public salaryForm: SalayForm) {}
}
