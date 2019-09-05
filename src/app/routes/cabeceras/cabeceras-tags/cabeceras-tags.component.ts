import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { filters } from 'redux/cabeceras/filter-form/filter-form.selectors';
import { FilterRequest } from 'redux/cabeceras/filter-form/filter-form.actions';

@Component({
  selector: 'app-cabeceras-tags',
  templateUrl: './cabeceras-tags.component.html',
  styles: [],
})
export class CabecerasTagsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  filters: any;
  translations = {
    cuit: 'global.cuit',
    nombre: 'global.nombre',
    direccion: 'global.direccion',
    email: 'global.email',
  };
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscription = this.store.select(filters).subscribe(pageFilters => {
      this.filters = pageFilters;
    });
  }

  onRemoveTag(tag: string) {
    const newFilters = { ...this.filters };
    newFilters[tag] = null;
    this.store.dispatch(new FilterRequest({ data: newFilters }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
