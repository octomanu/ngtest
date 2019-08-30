import { Component, OnInit } from '@angular/core';
import { SacForm } from '../sac.form';
import { fadeInOut } from '@shared/animations/fade-in-out.animation';

@Component({
  selector: 'app-preview-tab-sac',
  templateUrl: './preview-tab.component.html',
  styles: [],
  animations: [fadeInOut],
})
export class PreviewTabComponent implements OnInit {
  constructor(public sacForm: SacForm) {}

  ngOnInit() {}
}
