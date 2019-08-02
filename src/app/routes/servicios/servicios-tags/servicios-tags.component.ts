import { Component, OnInit } from '@angular/core';
import { AppState } from 'redux/app.reducer';
import { Store } from '@ngrx/store';
import { selectFiltros } from 'redux/servicios/servicios.selectors';
import { ChangeFilterAction } from 'redux/servicios/servicios.actions';

@Component({
  selector: 'app-servicios-tags',
  templateUrl: './servicios-tags.component.html',
  styles: [],
})
export class ServiciosTagsComponent implements OnInit {
  tags = {
    descripcion: { title: 'global.descripcion', used: false },
  };
  constructor(public store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(selectFiltros).subscribe(filtros => {
      this.tags.descripcion.used = filtros.descripcion ? true : false;
    });
  }

  onRemoveTag(tag: string) {
    this.store.dispatch(new ChangeFilterAction({ descripcion: null }));
  }
}
