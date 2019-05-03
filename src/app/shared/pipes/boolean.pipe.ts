import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'boolean',
})
export class BooleanPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: boolean, args?: any): any {
    if (value) {
      return this.translate.get('global.true').pipe(trans => trans);
    }

    return this.translate.get('global.false').pipe(trans => trans);
  }
}
