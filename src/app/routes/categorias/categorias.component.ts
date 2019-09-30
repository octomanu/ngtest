import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { selectHelp, selectKeepHelp } from 'redux/global/global.selectors';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: [],
})
export class CategoriasComponent implements OnInit {
  help: Observable<boolean>;
  keepHelp: Observable<boolean>;

  constructor(protected store: Store<AppState>) {}

  ngOnInit() {
    this.help = this.store.select(selectHelp);
    this.keepHelp = this.store.select(selectKeepHelp);
  }
}
