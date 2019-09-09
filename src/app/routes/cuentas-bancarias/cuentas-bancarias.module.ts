import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { CuentasBancariasComponent } from './cuentas-bancarias.component';

export const routes: Routes = [
  {
    path: '',
    component: CuentasBancariasComponent,
    data: { title: 'Cuentas bancarias' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, CuentasBancariasComponent],
  entryComponents: COMPONENTS,
})
export class CuentasBancariasModule {}
