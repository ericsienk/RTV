import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[rtvEmbedable]'
})
export class EmbedableDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }
}
