import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormFacade } from '../facade/form.facade';

@Component({
  selector: 'app-juicios-form',
  templateUrl: './juicios-form.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JuiciosFormComponent implements OnDestroy {
  constructor(public form: FormFacade) {}

  ngOnDestroy() {
    this.form.close();
  }
}
