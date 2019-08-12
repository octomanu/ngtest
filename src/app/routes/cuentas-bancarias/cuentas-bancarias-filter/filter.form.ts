import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterForm {
  constructor(private fb: FormBuilder) {}
  getForm(): FormGroup {
    return this.fb.group({
      banco: [null, []],
      alias: [null, []],
      numero_cuenta: [null, []],
    });
  }
}
