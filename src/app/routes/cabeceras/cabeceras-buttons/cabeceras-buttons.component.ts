import {
  Component,
  TemplateRef,
  ViewContainerRef,
  OnInit,
} from '@angular/core';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import {
  OpenFilterForm,
  FilterRequest,
} from 'redux/cabeceras/filter-form/filter-form.actions';
import { OpenCreateForm } from 'redux/cabeceras/create-form/create-form.actions';
import { Observable } from 'rxjs';
import { selectHelp, selectKeepHelp } from 'redux/global/global.selectors';
@Component({
  selector: 'app-cabeceras-buttons',
  templateUrl: './cabeceras-buttons.component.html',
  styles: [],
})
export class CabecerasButtonsComponent implements OnInit {
  help$: Observable<boolean>;
  keepHelp$: Observable<boolean>;
  tooltips: {
    btnCrear: TemplateRef<TooltipHelpComponent>;
    btnFiltros: TemplateRef<TooltipHelpComponent>;
    btnNoFltros: TemplateRef<TooltipHelpComponent>;
  };

  constructor(
    private store: Store<AppState>,
    public tooltipBuilder: TooltipHelperService,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngOnInit() {
    this.help$ = this.store.select(selectHelp);
    this.keepHelp$ = this.store.select(selectKeepHelp);
    this.tooltipBuilder.setViewContainerRef(this.viewContainerRef);
    this.tooltips = this.tooltipBuilder.getButtonsTooltips();
  }

  openFilter() {
    this.store.dispatch(new OpenFilterForm());
  }

  create() {
    this.store.dispatch(new OpenCreateForm());
  }

  clearFilter() {
    this.store.dispatch(new FilterRequest({ data: null }));
  }
}
