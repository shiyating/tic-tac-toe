import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Block } from './block';

@Directive({
  selector: '[appShowTurn]'
})
export class ShowTurnDirective {

    constructor(private el: ElementRef) { }

    @Input('appShowTurn') turn: string;

    @HostListener('mouseenter') onMouseEnter() {
      if (this.turn !== 'voted') {
        this.el.nativeElement.innerText = this.turn;
        this.el.nativeElement.style.cursor = 'pointer';
      }
    }

    @HostListener('mouseleave') onMouseLeave() {
      if (this.turn !== 'voted') {
        this.el.nativeElement.innerText = '';
      }
      this.el.nativeElement.style.cursor = 'default';
    }
}
