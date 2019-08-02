import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { GlobalState } from 'redux/global/globa.reducer';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HideModalHelpAction } from 'redux/global/global.actions';

@Component({
  selector: 'app-modal-help',
  templateUrl: './modal-help.component.html',
  styles: [],
})
export class ModalHelpComponent implements OnInit {
  visible: boolean;
  url: SafeResourceUrl;
  subscription: Subscription;
  constructor(public state: Store<AppState>, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.state.select('globalState').subscribe((state: GlobalState) => {
      if (!state.modalAyuda.url) {
        return;
      }
      this.visible = state.modalAyuda.visible;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
        state.modalAyuda.url,
      );
    });
  }

  close() {
    this.visible = false;
    this.state.dispatch(new HideModalHelpAction());
  }
}
