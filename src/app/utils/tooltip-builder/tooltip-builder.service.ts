import {
  Injectable,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { TooltipHelpComponent } from '@shared/components/tooltip-help/tooltip-help.component';

@Injectable({
  providedIn: 'root',
})
export class TooltipBuilderService {
  public viewContainerRef: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

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
}
