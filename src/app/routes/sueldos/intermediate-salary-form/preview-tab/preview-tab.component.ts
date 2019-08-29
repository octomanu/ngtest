import { Component, OnInit } from '@angular/core';
import { fadeInOut } from '@shared/animations/fade-in-out.animation';
import { IntermediateSalayForm } from '../intermediate-salary.form';

@Component({
  selector: 'app-preview-tab-intermediate',
  templateUrl: './preview-tab.component.html',
  styles: [],
  animations: [fadeInOut],
})
export class PreviewTabComponent implements OnInit {
  constructor(public intermediateSalaryForm: IntermediateSalayForm) {}

  ngOnInit() {}
}
