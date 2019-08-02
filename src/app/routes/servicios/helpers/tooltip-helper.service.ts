import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { TooltipBuilder } from 'app/classes/tooltip-builder.class';

@Injectable({
  providedIn: 'root',
})
export class TooltipHelperService extends TooltipBuilder {
  constructor(componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }

  getTableTooltips() {
    return {
      tableHeader: this.build(
        'global.table_head_help',
        'https://www.youtube-nocookie.com/embed/tJHLxDoyigo?controls=0&amp;start=40',
      ),
      tableBody: this.build(
        'global.table_row_help',
        'https://www.youtube-nocookie.com/embed/OCmuATH2yzo?controls=0&amp;start=2',
      ),
    };
  }

  getButtonsTooltips() {
    return {
      btnCrear: this.build(
        'global.crear',
        'https://www.youtube-nocookie.com/embed/leCVVw6iD84?controls=0&amp;start=6',
      ),
      btnFiltros: this.build(
        'global.filtros',
        'https://www.youtube-nocookie.com/embed/leCVVw6iD84?controls=0&amp;start=6',
      ),
      btnNoFltros: this.build(
        'global.eliminar_busqueda',
        'https://www.youtube-nocookie.com/embed/leCVVw6iD84?controls=0&amp;start=6',
      ),
    };
  }
}
