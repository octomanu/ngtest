import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root',
})
export class BackendErrorMessageBuilderService {
  constructor(private msg: NzMessageService) {}

  buildMessage(errors: any) {
    for (const field in errors) {
      if (errors.hasOwnProperty(field)) {
        const fieldErrors = errors[field];
        const message = 'El campo ' + field;

        for (const error in fieldErrors) {
          if (fieldErrors.hasOwnProperty(error)) {
            this.msg.error(`Campo: ${field}, Error: ${error}`);
          }
        }
      }
    }
  }
}
