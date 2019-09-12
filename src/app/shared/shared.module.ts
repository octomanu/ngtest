import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonACLModule } from '@delon/acl';
// i18n
import { TranslateModule } from '@ngx-translate/core';

// #region third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';
import { BooleanPipe } from './pipes/boolean.pipe';
import { TooltipHelpComponent } from './components/tooltip-help/tooltip-help.component';
import { ModalHelpComponent } from './components/modal-help/modal-help.component';
import { TableTagsComponent } from './components/table-tags/table-tags.component';

const THIRDMODULES = [NgZorroAntdModule, CountdownModule];
// #endregion

// #region your componets & directives
const COMPONENTS = [
  TooltipHelpComponent,
  ModalHelpComponent,
  TableTagsComponent,
];
const DIRECTIVES = [];
const PIPES = [BooleanPipe];
// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonABCModule,
    DelonACLModule.forRoot(),
    TranslateModule,
    // third libs
    ...THIRDMODULES,
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
  entryComponents: [TooltipHelpComponent, ModalHelpComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlainThemeModule,
    DelonABCModule,
    DelonACLModule,
    // i18n
    TranslateModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
})
export class SharedModule {}
