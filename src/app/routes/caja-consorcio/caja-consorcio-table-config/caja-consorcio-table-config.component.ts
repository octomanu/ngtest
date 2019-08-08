import { Component, OnInit } from '@angular/core';
import { ConsorciosService } from '@core/http/consorcios/consorcios.service';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { ChangeFilterAction } from 'redux/caja-consorcio/caja-consorcio.actions';

@Component({
  selector: 'app-caja-consorcio-table-config',
  templateUrl: './caja-consorcio-table-config.component.html',
  styles: [],
})
export class CajaConsorcioTableConfigComponent implements OnInit {
  idConsorcios = [];
  timeout = null;
  isLoading = false;
  consorcios: { id: number; display: string }[];
  constructor(
    public consorciosService: ConsorciosService,
    public store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.searchConsorciosList('');
  }

  changeCuentaCorrienteConfig() {
    this.store.dispatch(
      new ChangeFilterAction({ id_consorcio: this.idConsorcios }),
    );
  }

  searchConsorcios(display: string) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.isLoading = true;
      this.searchConsorciosList(display);
    }, 400);
  }

  protected searchConsorciosList(display: string) {
    this.consorciosService
      .searchByDisplay(display)
      .subscribe((data: { id: number; display: string }[]) => {
        this.isLoading = false;
        this.consorcios = data;
      });
  }
}
