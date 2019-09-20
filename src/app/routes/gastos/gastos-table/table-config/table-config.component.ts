import { Component } from '@angular/core';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import {
  ChangeProveedorVisibility,
  ChangeConsorcioVisibility,
  ChangeServicioVisibility,
} from 'redux/gastos/page/page.actions';
import { ConsorciosFinderService } from 'app/routes/services/type-ahead/consorcios-finder/consorcios-finder.service';
import { ProveedorFinderService } from 'app/routes/services/type-ahead/proveedor-finder/proveedor-finder.service';
import { ServiciosFinderService } from 'app/routes/services/type-ahead/servicios-finder/servicios-finder.service';

@Component({
  selector: 'app-table-config',
  templateUrl: './table-config.component.html',
  styles: [],
  providers: [
    ConsorciosFinderService,
    ProveedorFinderService,
    ServiciosFinderService,
  ],
})
export class TableConfigComponent {
  extraData = false;
  constructor(
    private store: Store<AppState>,
    public consorciosFinder: ConsorciosFinderService,
    public proveedorFinder: ProveedorFinderService,
    public serviciosFinder: ServiciosFinderService,
  ) {}

  changeMasterFilter(filter: string, value: any) {
    switch (filter) {
      case 'proveedor':
        this.store.dispatch(
          new ChangeProveedorVisibility({ visible: value ? false : true }),
        );
        break;
      case 'consorcio':
        this.store.dispatch(
          new ChangeConsorcioVisibility({ visible: value ? false : true }),
        );
        break;
      case 'servicio':
        this.store.dispatch(
          new ChangeServicioVisibility({ visible: value ? false : true }),
        );
        break;
    }
  }
}
