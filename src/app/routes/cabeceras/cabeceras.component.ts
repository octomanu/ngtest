import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { selectHelp, selectKeepHelp } from 'redux/global/global.selectors';
@Component({
  selector: 'app-cabeceras',
  templateUrl: './cabeceras.component.html',
  styles: [],
})
export class CabecerasComponent implements OnInit {
  help: Observable<boolean>;
  keepHelp: Observable<boolean>;

  constructor(protected store: Store<AppState>) {}

  ngOnInit() {
    this.help = this.store.select(selectHelp);
    this.keepHelp = this.store.select(selectKeepHelp);
  }
}
