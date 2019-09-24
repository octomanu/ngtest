import { NgModule } from '@angular/core';
import { ProveedorFormComponent } from './proveedor-form.component';
import { SharedModule } from '@shared';

@NgModule({
  imports: [SharedModule],
  declarations: [ProveedorFormComponent],
  exports: [ProveedorFormComponent],
  entryComponents: [ProveedorFormComponent],
})
export class ProveedorFormModule {}
