import { Component, OnInit } from '@angular/core';
import { SacForm } from '../sac.form';

@Component({
  selector: 'app-basic-information-tab-sac',
  templateUrl: './basic-information-tab.component.html',
  styles: [],
})
export class BasicInformationTabComponent implements OnInit {
  constructor(public sacForm: SacForm) {}

  ngOnInit() {}
}
