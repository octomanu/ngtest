import {
  Component,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ButtonsComponent } from 'app/routes/classes/ButtonsComponent.class';
import { CuentaCorrienteUfFilterComponent } from '../cuenta-corriente-uf-filter/cuenta-corriente-uf-filter.component';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import { TranslateService } from '@ngx-translate/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { CuentaCorrienteUfState } from 'redux/cuenta-corriente-uf/cuenta-corriente-uf-reducer';
import {
  ChangeConsorcioAction,
  ChangeUfAction,
  ChangeFilterAction,
} from 'redux/cuenta-corriente-uf/cuenta-corriente-uf-actions';
import { CobroFormComponent } from '../cobro-form/cobro-form.component';
import { DeudaFormComponent } from '../deuda-form/deuda-form.component';
import { UfFinderService } from 'app/routes/services/uf-finder.service';

@Component({
  selector: 'app-cuenta-corriente-uf-buttons',
  templateUrl: './cuenta-corriente-uf-buttons.component.html',
  styles: [],
  providers: [UfFinderService],
})
export class CuentaCorrienteUfButtonsComponent extends ButtonsComponent
  implements OnInit {
  public idConsorcio;
  public idUf;
  drawerTitle = 'global.cuenta_corriente_uf';
  drawerContent = CuentaCorrienteUfFilterComponent;
  consorcios: { id: number; display: string }[];
  ufs: { id: number; display: string }[];
  isLoading = false;
  protected timeout = null;

  tooltips: {
    btnCrear: TemplateRef<TooltipHelpComponent>;
    btnFiltros: TemplateRef<TooltipHelpComponent>;
    btnNoFltros: TemplateRef<TooltipHelpComponent>;
  };

  constructor(
    protected store: Store<AppState>,
    protected tooltipBuilder: TooltipHelperService,
    public ufFinder: UfFinderService,
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
      .select('cuentaCorrienteUf')
      .subscribe((state: CuentaCorrienteUfState) => {
        if (state.id_consorcio) {
          this.ufFinder.ufsService.setConsorcio(state.id_consorcio.toString());
          this.ufFinder.searchUfs('', false);
        }
        this.idConsorcio = state.id_consorcio;
        this.idUf = state.id_uf;
      });
  }

  cobro() {
    this.translate.get('global.cobro').subscribe((res: string) => {
      this.drawerService.create({
        nzTitle: res,
        nzWidth: this.smallViewport ? '100%' : '75%',
        nzContent: CobroFormComponent,
        nzPlacement: 'right',
      });
    });
  }

  deuda() {
    this.translate.get('global.deuda').subscribe((res: string) => {
      this.drawerService.create({
        nzTitle: res,
        nzWidth: this.smallViewport ? '100%' : '75%',
        nzContent: DeudaFormComponent,
        nzPlacement: 'right',
      });
    });
  }

  changeConsorcio() {
    this.store.dispatch(new ChangeConsorcioAction(this.idConsorcio));
    this.ufFinder.ufsService.setConsorcio(this.idConsorcio);
    this.ufFinder.searchUfs('', false);
  }

  changeUf() {
    this.store.dispatch(new ChangeUfAction(this.idUf));
  }

  searchConsorcios(display: string) {
    this.ufFinder.searchConsorcios(display);
  }

  searchUfs(display: string) {
    this.ufFinder.searchUfs(display);
  }

  clearFilter() {
    this.store.dispatch(
      new ChangeFilterAction({ descripcion: null, fecha: null, monto: null }),
    );
  }
}
