import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { ButtonsComponent } from 'app/routes/classes/ButtonsComponent.class';
import { OrdenesPagoFilterComponent } from '../ordenes-pago-filter/ordenes-pago-filter.component';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import { TranslateService } from '@ngx-translate/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { ChangeFilterAction } from 'redux/ordenes-pago/ordenes-pago.actions';

@Component({
  selector: 'app-ordenes-pago-buttons',
  templateUrl: './ordenes-pago-buttons.component.html',
  styles: [],
})
export class OrdenesPagoButtonsComponent extends ButtonsComponent {
  drawerTitle = 'global.ordenes_pago';
  drawerContent = OrdenesPagoFilterComponent;
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

  clearFilter() {
    this.store.dispatch(
      new ChangeFilterAction({ banco: null, alias: null, numero_cuenta: null }),
    );
  }
}
