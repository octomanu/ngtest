import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { ButtonsComponent } from 'app/routes/classes/ButtonsComponent.class';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import { TranslateService } from '@ngx-translate/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { ChangeFilterAction } from 'redux/caja-consorcio/caja-consorcio.actions';
import { IngresoFormComponent } from '../ingreso-form/ingreso-form.component';
import { EgresoFormComponent } from '../egreso-form/egreso-form.component';

@Component({
  selector: 'app-caja-consorcio-buttons',
  templateUrl: './caja-consorcio-buttons.component.html',
  styles: [],
})
export class CajaConsorcioButtonsComponent extends ButtonsComponent {
  drawerTitle = 'global.caja_consorcio';
  drawerContent: any;
  tooltips: {
    btnCrear: TemplateRef<TooltipHelpComponent>;
    btnFiltros: TemplateRef<TooltipHelpComponent>;
    btnNoFltros: TemplateRef<TooltipHelpComponent>;
  };

  constructor(
    public store: Store<AppState>,
    public tooltipBuilder: TooltipHelperService,
    translate: TranslateService,
    drawerService: NzDrawerService,
    viewContainerRef: ViewContainerRef,
  ) {
    super(translate, drawerService);
    this.tooltipBuilder.setViewContainerRef(viewContainerRef);
    this.tooltips = this.tooltipBuilder.getButtonsTooltips();
  }

  ingreso() {
    this.translate.get('global.ingreso').subscribe((res: string) => {
      this.drawerService.create({
        nzTitle: res,
        nzWidth: this.smallViewport ? '100%' : '75%',
        nzContent: IngresoFormComponent,
        nzPlacement: 'right',
        nzContentParams: { type: 'ingreso' },
      });
    });
  }

  egreso() {
    this.translate.get('global.egreso').subscribe((res: string) => {
      this.drawerService.create({
        nzTitle: res,
        nzWidth: this.smallViewport ? '100%' : '75%',
        nzContent: IngresoFormComponent,
        nzPlacement: 'right',
        nzContentParams: { type: 'egreso' },
      });
    });
  }
}
