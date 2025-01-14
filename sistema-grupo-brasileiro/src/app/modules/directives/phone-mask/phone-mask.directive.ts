import { Directive, HostListener, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appPhoneMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneMaskDirective),
      multi: true
    }
  ]
})
export class PhoneMaskDirective implements ControlValueAccessor {
  private onChange!: (value: string) => void;
  private onTouched!: () => void;

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent): void {
    let input = this.el.nativeElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length <= 10) {
      value = value.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
    } else {
      value = value.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
    }
    input.value = value;

    if (this.onChange) {
      this.onChange(input.value);
    }
  }

  writeValue(value: string): void {
    if (value) {
      this.el.nativeElement.value = value;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
