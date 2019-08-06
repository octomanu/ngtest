import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { Subscription } from 'rxjs';
import * as gs from 'redux/global/global.selectors';
import { ChangeFilterAction } from 'redux/gastos-descripciones/gastos-descripciones.actions';
import { GastosDescripcionesState } from 'redux/gastos-descripciones/gastos-descripciones.reducer';
@Component({
  selector: 'app-gastos-descripciones-filter',
  templateUrl: './gastos-descripciones-filter.component.html',
  styles: [],
})
export class GastosDescripcionesFilterComponent implements OnInit, OnDestroy {
  titulo: string;
  subscriptions: Subscription[] = [];

  constructor(public drawerRef: NzDrawerRef, public store: Store<AppState>) {}

  ngOnInit() {
    this.drawerRef.afterOpen.subscribe(() => {
      const viewportSubscription = this.store
        .select(gs.smallViewport)
        .subscribe((viewport: boolean) => {
          this.drawerRef.nzWidth = viewport ? '100%' : '50%';
        });

      this.subscriptions.push(viewportSubscription);
    });

    const stateSubscription = this.store
      .select('gastosDescripcionesState')
      .subscribe((state: GastosDescripcionesState) => {
        this.titulo = state.filtros.titulo;
      });

    this.subscriptions.push(stateSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.map(sub => {
      sub.unsubscribe();
    });
  }

  submit() {
    this.store.dispatch(new ChangeFilterAction({ titulo: this.titulo }));
    this.drawerRef.close();
  }
}
