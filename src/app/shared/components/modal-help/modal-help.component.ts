import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HideModalHelpAction } from 'redux/global/global.actions';

@Component({
  selector: 'app-modal-help',
  templateUrl: './modal-help.component.html',
  styles: [],
})
export class ModalHelpComponent {
  visible: boolean;
  url: SafeResourceUrl;
  subscription: Subscription;
  constructor(public state: Store<AppState>, private sanitizer: DomSanitizer) {
    console.log('cree un modall');
  }

  show(url: string) {
    this.visible = true;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  close() {
    this.visible = false;
    this.state.dispatch(new HideModalHelpAction());
  }
}
