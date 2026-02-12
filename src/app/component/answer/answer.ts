import {Component, ElementRef, EventEmitter, HostListener, Input, Output, Signal, ViewChild} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'answer',
  imports: [
    NgClass
  ],
  templateUrl: './answer.html',
  standalone: true,
  styleUrl: './answer.css',
})
export class AnswerButton {

  @Input({required: true}) label!: string;
  @Input({required: true}) isCorrect!: boolean;
  @Input({required: true}) isSelected!: boolean;
  @Input({required: true}) showResults!: Signal<boolean>;
  @Output() answerSelected = new EventEmitter<boolean>
  @ViewChild('textContainer') textContainer!: ElementRef<HTMLDivElement>

  constructor() {
  }

  protected toggleSelected() {
    if (!this.showResults()){
      this.isSelected = !this.isSelected
      this.answerSelected.emit(this.isSelected)
    }
  }


  ngAfterViewInit(){
    this.adjustFontSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustFontSize();
  }


  adjustFontSize() {
    const el = this.textContainer.nativeElement
    let fontSize = 20
    el.style.fontSize = fontSize + "px"
    while((el.clientWidth < el.scrollWidth ||  el.scrollHeight >   el.clientHeight) && fontSize > 6){
      fontSize -= 1
      el.style.fontSize = fontSize + "px"
    }
  }
}
