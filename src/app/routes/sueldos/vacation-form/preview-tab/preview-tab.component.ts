import { Component, OnInit } from '@angular/core';
import { VacationForm } from '../vacation.form';
import { fadeInOut } from '@shared/animations/fade-in-out.animation';

@Component({
  selector: 'app-preview-tab-vacation',
  templateUrl: './preview-tab.component.html',
  styles: [],
  animations: [fadeInOut],
})
export class PreviewTabComponent implements OnInit {
  constructor(public vacationForm: VacationForm) {}

  ngOnInit() {}
}
