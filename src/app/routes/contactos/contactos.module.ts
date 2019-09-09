import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { COMPONENTS } from './components.index';
import { SharedModule } from '@shared';
import { ContactosComponent } from './contactos.component';

export const routes: Routes = [
  {
    path: '',
    component: ContactosComponent,
    data: { title: 'Contactos' },
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...COMPONENTS, ContactosComponent],
  entryComponents: COMPONENTS,
})
export class ContactosModule {}
