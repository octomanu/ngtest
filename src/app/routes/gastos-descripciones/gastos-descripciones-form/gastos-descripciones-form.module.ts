import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { GastosDescripcionesFormComponent } from './gastos-descripciones-form.component';

@NgModule({
  imports: [SharedModule],
  declarations: [GastosDescripcionesFormComponent],
  exports: [GastosDescripcionesFormComponent],
  entryComponents: [GastosDescripcionesFormComponent],
})
export class GastosDescripcionesFormModule {}
