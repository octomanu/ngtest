import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { selectFiltros } from 'redux/cuenta-corriente-proveedor/cuenta-corriente-proveedor.selector';
import { ChangeFilterAction } from 'redux/cuenta-corriente-proveedor/cuenta-corriente-proveedor.actions';

@Component({
  selector: 'app-cuenta-corriente-proveedor-tags',
  templateUrl: './cuenta-corriente-proveedor-tags.component.html',
  styles: [],
})
export class CuentaCorrienteProveedorTagsComponent
  implements OnInit, OnDestroy {
  subscription: Subscription;
  tags = {
    descripcion: { title: 'global.descripcion', used: false },
    fecha: { title: 'global.fecha', used: false },
    monto: { title: 'global.monto', used: false },
  };

  filtros: { descripcion: string; fecha: string; monto: string };
  constructor(public store: Store<AppState>) {}

  ngOnInit() {
    this.subscription = this.store.select(selectFiltros).subscribe(filtros => {
      this.filtros = { ...filtros };
      this.tags.descripcion.used = filtros.descripcion ? true : false;
      this.tags.fecha.used = filtros.fecha ? true : false;
      this.tags.monto.used = filtros.monto ? true : false;
    });
  }

  onRemoveTag(tag: string) {
    this.filtros[tag] = null;
    this.store.dispatch(new ChangeFilterAction({ ...this.filtros }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
