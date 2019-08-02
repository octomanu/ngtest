import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { UpdateMenuAction } from 'redux/menu/menu.actions';
import { MenuState } from 'redux/menu/menu.reducer';
import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-crear-menu',
  templateUrl: './crear-menu.component.html',
  styles: [],
})
export class CrearMenuComponent implements OnInit {
  @Input() favorito: boolean;

  menu: any[];

  form: FormGroup;
  constructor(
    public fb: FormBuilder,
    public cdr: ChangeDetectorRef,
    public store: Store<AppState>,
    public drawerRef: NzDrawerRef,
  ) {}

  ngOnInit() {
    this.initFormn();
    this.store.select('menuState').subscribe((state: MenuState) => {
      this.menu = [...state.menu];
    });
  }

  initFormn() {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      route: [null, [Validators.required]],
      icon: [null],
      fav: [null, []],
    });
  }

  crearItem() {
    const item = {
      custom: true,
      title: this.form.value.title,
      route: this.form.value.route,
      icon: 'link',
      fav: this.form.value.fav,
    };
    this.menu.push(item);
    this.store.dispatch(new UpdateMenuAction(this.menu));
    this.drawerRef.close();
  }
}
