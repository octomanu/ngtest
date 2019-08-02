import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { MenuState } from 'redux/menu/menu.reducer';
import { UpdateMenuAction } from 'redux/menu/menu.actions';
import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-editar-menu',
  templateUrl: './editar-menu.component.html',
  styles: [],
})
export class EditarMenuComponent implements OnInit {
  form: FormGroup;
  menu: any[];
  @Input() index: number;
  @Input() item: {
    title: string;
    route: string;
    icon: string;
    fav: boolean;
    custom: boolean;
  };

  constructor(
    private fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    public store: Store<AppState>,
    public drawerRef: NzDrawerRef,
  ) {}

  ngOnInit() {
    this.initFormn();
    this.store.select('menuState').subscribe((state: MenuState) => {
      this.menu = [...state.menu];
    });
  }

  eliminarItem() {
    this.menu.splice(this.index, 1);
    this.store.dispatch(new UpdateMenuAction(this.menu));
    this.drawerRef.close();
  }

  editarItem() {
    const formValue = this.form.value;
    this.menu[this.index] = { ...formValue, custom: this.item.custom };
    this.store.dispatch(new UpdateMenuAction(this.menu));
    this.drawerRef.close();
  }

  initFormn() {
    this.form = this.fb.group({
      title: [this.item.title, [Validators.required]],
      route: [this.item.route, [Validators.required]],
      icon: [this.item.icon],
      fav: [this.item.fav, []],
    });
  }
}
