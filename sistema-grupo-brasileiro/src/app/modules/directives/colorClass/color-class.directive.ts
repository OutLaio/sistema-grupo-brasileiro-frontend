import { Directive, ElementRef, Input, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[colorClass], [backgroundColorClass], [borderColorClass]'
})
export class ColorClassDirective implements OnChanges {
  @Input() colorClass: string = '';
  @Input() backgroundColorClass: string = '';
  @Input() borderColorClass: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['colorClass']) {
      this.setColor(this.colorClass);
    }
    if (changes['backgroundColorClass']) {
      this.setBackgroundColor(this.backgroundColorClass);
    }
    
    if (changes['borderColorClass']) {
      this.setBorderColorClass(this.borderColorClass);
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

  private setBorderColorClass(color: string) {
    if (color) {
      this.renderer.setStyle(this.el.nativeElement, 'border-color', color);
    }
  }
}
