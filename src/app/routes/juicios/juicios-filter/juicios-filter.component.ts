import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { JuiciosFilterForm } from 'app/routes/juicios/juicios-filter/juicios-filter.form';
import { NzDrawerRef } from 'ng-zorro-antd';
import {
  FilterRequest,
  CloseFilterForm,
} from 'redux/juicios/filter-form/filter-form.actions';
import { ConsorciosFinderService } from 'app/routes/services/type-ahead/consorcios-finder/consorcios-finder.service';

@Component({
  selector: 'app-juicios-filter',
  templateUrl: './juicios-filter.component.html',
  styles: [],
  providers: [JuiciosFilterForm, ConsorciosFinderService],
})
export class JuiciosFilterComponent implements OnDestroy {
  constructor(
    private store: Store<AppState>,
    public fb: JuiciosFilterForm,
    public drawerRef: NzDrawerRef,
    public consorcioSelect: ConsorciosFinderService,
  ) {}

  submit() {
    this.store.dispatch(new FilterRequest({ data: this.fb.form.value }));
    this.drawerRef.close();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new CloseFilterForm());
  }
}
