import {
  Component,
  TemplateRef,
  ViewContainerRef,
  OnInit,
} from '@angular/core';
import { ButtonsComponent } from 'app/routes/classes/ButtonsComponent.class';
import { CuentaCorrienteProveedorFilterComponent } from '../cuenta-corriente-proveedor-filter/cuenta-corriente-proveedor-filter.component';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import { TranslateService } from '@ngx-translate/core';
import { NzDrawerService } from 'ng-zorro-antd';
import {
  ChangeFilterAction,
  ChangeProveedorAction,
} from 'redux/cuenta-corriente-proveedor/cuenta-corriente-proveedor.actions';
import { ProveedorFinderService } from 'app/routes/services/proveedor-finder/proveedor-finder.service';
import { selectIdProveedor } from 'redux/cuenta-corriente-proveedor/cuenta-corriente-proveedor.selector';

@Component({
  selector: 'app-cuenta-corriente-proveedor-buttons',
  templateUrl: './cuenta-corriente-proveedor-buttons.component.html',
  styles: [],
  providers: [ProveedorFinderService],
})
export class CuentaCorrienteProveedorButtonsComponent extends ButtonsComponent
  implements OnInit {
  public idProveedor;
  drawerTitle = 'global.cuenta_corriente_proveedor';
  drawerContent = CuentaCorrienteProveedorFilterComponent;
  proveedores: { id: number; display: string }[];
  protected timeout = null;
  protected isLoading = false;
  tooltips: {
    btnCrear: TemplateRef<TooltipHelpComponent>;
    btnFiltros: TemplateRef<TooltipHelpComponent>;
    btnNoFltros: TemplateRef<TooltipHelpComponent>;
  };

  constructor(
    protected store: Store<AppState>,
    protected tooltipBuilder: TooltipHelperService,
    public proveedoresFinder: ProveedorFinderService,
    translate: TranslateService,
    drawerService: NzDrawerService,
    viewContainerRef: ViewContainerRef,
  ) {
    super(translate, drawerService);
    this.tooltipBuilder.setViewContainerRef(viewContainerRef);
    this.tooltips = this.tooltipBuilder.getButtonsTooltips();
  }

  ngOnInit(): void {
    this.store
      .select(selectIdProveedor)
      .subscribe(idProveedor => (this.idProveedor = idProveedor));
  }

  changeProveedor() {
    this.store.dispatch(new ChangeProveedorAction(this.idProveedor));
  }

  searchProveedores(display: string) {
    this.proveedoresFinder.searchProveedores(display);
  }

  clearFilter() {
    this.store.dispatch(
      new ChangeFilterAction({ descripcion: null, fecha: null, monto: null }),
    );
  }
}
