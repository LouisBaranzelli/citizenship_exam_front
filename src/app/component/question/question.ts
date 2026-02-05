import {Component, computed, ElementRef, Input, Signal, signal, ViewChild, WritableSignal} from '@angular/core';
import {QuestionStateService} from '../../service/question-state.service';
import {SelectorRightLeft} from '../selector-right-left/selector-right-left';
import {Answer} from '../../model/Answer';
import {AnswersList} from '../answers-list/anwers-list';

@Component({
  selector: 'question',
  imports: [
    SelectorRightLeft,
    AnswersList,
  ],
  templateUrl: './question.html',
  styleUrl: './question.css',
})


export class Question {

@ViewChild("textContainer") textContainer!: ElementRef<HTMLDivElement>

  public labelQuestion: Signal<string>;
  protected answers: Signal<Answer[]>
  protected showResults: Signal<boolean>;

 constructor(questionService: QuestionStateService) {

  this.labelQuestion = computed(() =>{
   return  questionService.selectedQuestion()?.question ?? ""
  }
 )
   this.answers = computed(() => {
     const question = questionService.selectedQuestion();
     return question !== null && question!.answers ? [...question!.answers] : [];
   });

   this.showResults = computed(() => {
     const question = questionService.selectedQuestion();
     const showResults: Map<number, boolean> = questionService.showResults()
     if (question === null || showResults.get(question?.id) === null){
       console.log("show results: False (question or id is null)")
       return false
     } else {
       console.log("show results: " +  showResults.get(question!.id) || false + " for id: " + question!.id)

       return  showResults.get(question!.id) || false
     }
   });


   }

  ngAfterViewInit() {
    this.adjustFontSize();
  }

  adjustFontSize(){
    const el = this.textContainer.nativeElement
    let fontSize = 30
    el.style.fontSize = fontSize + "px"
    while ((el.clientWidth < el.scrollWidth || el.scrollHeight > el.clientHeight) && fontSize > 6) {
      fontSize -= 1
      el.style.fontSize = fontSize + "px"
    }
  }

}
