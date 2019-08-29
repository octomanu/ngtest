import { Component, OnInit } from '@angular/core';
import { SalayForm } from '../salary.form';
import { fadeInOut } from '@shared/animations/fade-in-out.animation';

@Component({
  selector: 'app-preview-tab',
  templateUrl: './preview-tab.component.html',
  styles: [],
  animations: [fadeInOut],
})
export class PreviewTabComponent implements OnInit {
  constructor(public salaryForm: SalayForm) {}

  ngOnInit() {}
}
