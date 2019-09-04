import { Component, OnInit } from '@angular/core';
import { CabecerasForm } from './cabeceras.form';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { formLoading } from 'redux/cabeceras/cabeceras.selectors';
import { CabecerasUpdateRequest } from 'redux/cabeceras/cabeceras.actions';

@Component({
  selector: 'app-cabeceras-form',
  templateUrl: './cabeceras-form.component.html',
  styles: [],
})
export class CabecerasFormComponent implements OnInit {
  loading: boolean;

  constructor(private store: Store<AppState>, protected fb: CabecerasForm) {}

  ngOnInit() {
    this.store.select(formLoading).subscribe(loading => {
      this.loading = loading;
      if (loading) {
        this.fb.form.disable();
      } else {
        this.fb.form.enable();
      }
    });
  }

  submit() {
    const formData = this.fb.form.value;
    if (formData.id) {
      this.store.dispatch(new CabecerasUpdateRequest({ data: formData }));
    } else {
      // this.cabecerasService.create(formData).subscribe(data => {
      //   this.initForm();
      //   this.msg.success(`Creado!`);
      //   this.cdr.detectChanges();
      // });
    }
  }
}
