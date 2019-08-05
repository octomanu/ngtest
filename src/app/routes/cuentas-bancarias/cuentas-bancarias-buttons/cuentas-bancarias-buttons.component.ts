import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import { ChangeFilterAction } from 'redux/cuentas-bancarias/cuentas-bancarias.actions';
import { ButtonsComponent } from 'app/routes/classes/ButtonsComponent.class';

@Component({
  selector: 'app-cuentas-bancarias-buttons',
  templateUrl: './cuentas-bancarias-buttons.component.html',
  styles: [],
})
export class CuentasBancariasButtonsComponent extends ButtonsComponent {
  drawerTitle = 'global.cuenta.bancaria';
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

  clearFilter() {
    this.store.dispatch(new ChangeFilterAction({ descripcion: null }));
  }
}
