import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzDropdownService, NzDropdownContextComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-consorcios',
  templateUrl: './consorcios.component.html',
  styles: []
})
export class ConsorciosComponent implements OnInit {


  protected dropdown: NzDropdownContextComponent;

  ngOnInit(): void {}

  constructor(protected nzDropdownService: NzDropdownService) {}

  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    this.dropdown = this.nzDropdownService.create($event, template);
  }

}
