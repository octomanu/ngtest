import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import * as gs from 'redux/global/global.selectors';
import { ChangeFilterAction } from 'redux/servicios/servicios.actions';
import { ServiciosState } from 'redux/servicios/servicios.reducer';
import { Subscription } from 'rxjs';
import { selectServicios } from 'redux/servicios/servicios.selectors';

@Component({
  selector: 'app-servicios-filter',
  templateUrl: './servicios-filter.component.html',
  styles: [],
})
export class ServiciosFilterComponent implements OnInit, OnDestroy {
  descripcion: string;
  viewportSubscription: Subscription;
  stateSubscription: Subscription;

  constructor(public drawerRef: NzDrawerRef, public store: Store<AppState>) {}

  ngOnInit() {
    this.drawerRef.afterOpen.subscribe(() => {
      this.viewportSubscription = this.store
        .select(gs.smallViewport)
        .subscribe((viewport: boolean) => {
          this.drawerRef.nzWidth = viewport ? '100%' : '50%';
        });
    });

    this.stateSubscription = this.store
      .select(selectServicios)
      .subscribe((state: ServiciosState) => {
        this.descripcion = state.filtros.descripcion;
      });
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
    this.viewportSubscription.unsubscribe();
  }

  submit() {
    this.store.dispatch(
      new ChangeFilterAction({ descripcion: this.descripcion }),
    );
    this.drawerRef.close();
  }
}
