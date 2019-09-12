import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-tags',
  templateUrl: './table-tags.component.html',
  styles: [],
})
export class TableTagsComponent {
  @Input() filters: Observable<any>;
  @Input() translations: { [key: string]: string }[];
  @Output() removeTag = new EventEmitter();
  constructor() {}

  onRemoveTag(tag: string) {
    this.removeTag.emit(tag);
  }
}
