import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { NzDrawerService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { selectHelp, selectKeepHelp } from 'redux/global/global.selectors';
@Component({
  selector: 'app-cabeceras',
  templateUrl: './cabeceras.component.html',
  styles: [],
})
export class CabecerasComponent implements OnInit {
  help: Observable<boolean>;
  keepHelp: Observable<boolean>;

  constructor(
    protected store: Store<AppState>,
    public drawerService: NzDrawerService,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    this.help = this.store.select(selectHelp);
    this.keepHelp = this.store.select(selectKeepHelp);
  }
}
