import { ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';

export class TooltipBuilder {
  protected viewContainerRef: ViewContainerRef;
  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {}

  build(text: string, url: string) {
    if (!this.viewContainerRef) {
      throw new Error('viewContainerRef no seteado');
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      TooltipHelpComponent,
    );

    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(
      componentFactory,
    );
    componentRef.instance.text = text;
    componentRef.instance.url = url;

    return componentRef.instance.html;
  }

  setViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }
}
