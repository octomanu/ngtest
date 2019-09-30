import { Injectable } from '@angular/core';
import { DrawerService } from '@shared/utils/drawer.service';
import { CuotasComponent } from '../../gastos-form/cuotas/cuotas.component';
import { PorcentualesComponent } from '../../gastos-form/porcentuales/porcentuales.component';
import { ProveedorFormComponent } from 'app/routes/proveedores/proveedor-form/proveedor-form.component';
import { GastosDescripcionesFormComponent } from 'app/routes/gastos-descripciones/gastos-descripciones-form/gastos-descripciones-form.component';
import { first } from 'rxjs/operators';

@Injectable()
export class FormInteractions {
  constructor(private drawerService: DrawerService) {}

  openCuotasForm() {
    this.drawerService
      .create('global.cuotas', 'right', CuotasComponent, {}, '50%')
      .pipe(first())
      .subscribe();
  }

  openPorcentualesForm() {
    this.drawerService
      .create('global.porcentuales', 'right', PorcentualesComponent, {}, '50%')
      .pipe(first())
      .subscribe();
  }

  openProveedoresForm() {
    this.drawerService
      .create(
        'lambe.proveedores.proveedor',
        'right',
        ProveedorFormComponent,
        {},
        '50%',
      )
      .pipe(first())
      .subscribe();
  }

  openGastosDescripcionesForm() {
    this.drawerService
      .create(
        'global.gastos_descripciones',
        'right',
        GastosDescripcionesFormComponent,
        { minWidth: '50%' },
        '50%',
      )
      .pipe(first())
      .subscribe();
  }
}
