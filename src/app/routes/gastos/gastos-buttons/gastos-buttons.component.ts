import {
  Component,
  OnInit,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { TooltipHelperService } from 'app/routes/servicios/helpers/tooltip-helper.service';
import { selectHelp, selectKeepHelp } from 'redux/global/global.selectors';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';
import {
  OpenFilterForm,
  FilterRequest,
} from 'redux/gastos/filter-form/filter-form.actions';
import { OpenCreateForm } from 'redux/gastos/create-form/create-form.actions';
import { haveDues, loading } from 'redux/gastos/dues/dues.selectors';
import { DueSaveRequest } from 'redux/gastos/dues/dues.actions';

@Component({
  selector: 'app-gastos-buttons',
  templateUrl: './gastos-buttons.component.html',
  styles: [],
})
export class GastosButtonsComponent implements OnInit {
  haveDues$: Observable<boolean>;
  savingDues$: Observable<boolean>;
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
    this.haveDues$ = this.store.select(haveDues);
    this.savingDues$ = this.store.select(loading);
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

  submitDue() {
    this.store.dispatch(new DueSaveRequest());
  }
}
