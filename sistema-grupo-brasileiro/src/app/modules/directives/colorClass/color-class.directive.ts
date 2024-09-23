import { Directive, ElementRef, Input, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[colorClass], [backgroundColorClass]'
})
export class ColorClassDirective implements OnChanges {
  @Input() colorClass: string ='';
  @Input() backgroundColorClass: string ='';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['colorClass']) {
      this.setColor(this.colorClass);
    }
    if (changes['backgroundColorClass']) {
      this.setBackgroundColor(this.backgroundColorClass);
    }
  }

  private setColor(color: string) {
    if (color) {
      this.renderer.setStyle(this.el.nativeElement, 'color', color);
    }
  }

  private setBackgroundColor(color: string) {
    if (color) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
    }
  }
}
