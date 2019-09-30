import { Component } from '@angular/core';
import { ConsorciosFinderService } from 'app/routes/services/type-ahead/consorcios-finder/consorcios-finder.service';
import { ProveedorFinderService } from 'app/routes/services/type-ahead/proveedor-finder/proveedor-finder.service';
import { ServiciosFinderService } from 'app/routes/services/type-ahead/servicios-finder/servicios-finder.service';
import { TableConfigFacade } from '../../facade/table-config.facade';

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
    public tableConfig: TableConfigFacade,
    public consorciosFinder: ConsorciosFinderService,
    public proveedorFinder: ProveedorFinderService,
    public serviciosFinder: ServiciosFinderService,
  ) {}

  changeMasterFilter(filter: string, value: any) {
    switch (filter) {
      case 'proveedor':
        this.tableConfig.proveedorVisibility(value);
        break;
      case 'consorcio':
        this.tableConfig.consorcioVisibility(value);
        break;
      case 'servicio':
        this.tableConfig.servicioVisibility(value);
        break;
    }
  }
}
