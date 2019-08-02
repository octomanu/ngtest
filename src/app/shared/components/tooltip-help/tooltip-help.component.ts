import {
  Component,
  OnInit,
  ElementRef,
  Input,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { ShowModalHelpAction } from 'redux/global/global.actions';

@Component({
  selector: 'app-tooltip-help',
  templateUrl: './tooltip-help.component.html',
  styles: [],
})
export class TooltipHelpComponent {
  @Input() text: string;
  @Input() url: string;
  @ViewChild('html', { static: true }) html: TemplateRef<any>;

  constructor(public elRef: ElementRef, public store: Store<AppState>) {}

  openHelp() {
    this.store.dispatch(new ShowModalHelpAction(this.url));
  }
}
