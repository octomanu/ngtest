import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ChequesTercerosFormComponent } from './cheques-terceros-form.component';

@NgModule({
  imports: [SharedModule],
  declarations: [ChequesTercerosFormComponent],
  exports: [ChequesTercerosFormComponent],
  entryComponents: [ChequesTercerosFormComponent],
})
export class ChequesTercerosFormModule {}
