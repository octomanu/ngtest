import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';

import { I18NService } from './i18n/i18n.service';
import { DrawerBpDirective } from './spy/drawer-bp/drawer-bp.directive';
import { KeyPipe } from './pipes/key/key.pipe';

@NgModule({
  providers: [I18NService],
  declarations: [DrawerBpDirective, KeyPipe],
  exports: [KeyPipe]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
