import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appCapitalize]'
})
export class CapitalizeDirective implements OnChanges {
  @Input() appCapitalize!: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnChanges(): void {
    if (this.appCapitalize){
      const words = this.appCapitalize.split(' ');
      let capitalizedWords = words.map(word => this.capitalizeWords(word));
      this.el.nativeElement.innerText = capitalizedWords.join(' ');
      console.log(capitalizedWords)
    }
  }

  private capitalizeWords(text: string): string {
    return text
      .toLowerCase()
      .replace(/\b\w/, char => char.toUpperCase());
  }

}
