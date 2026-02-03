import { Component } from '@angular/core';
import {Tile} from "../tile/tile";
import {ThemeID, THEMES} from '../../model/Theme';
import {NgForOf} from '@angular/common';
import {throwIfEmpty} from 'rxjs';
import {QuestionStateService} from '../../service/question-state.service';

@Component({
  selector: 'theme-tile',
  imports: [
    Tile,
    NgForOf
  ],
  templateUrl: './theme-tile.html',
  styleUrl: './theme-tile.css',
})
export class ThemeTile {
  private questionService: QuestionStateService;
  protected selectedTheme: ThemeID | null = null;

  constructor(questionService: QuestionStateService) {
  this.questionService = questionService
}

  protected readonly ThemeID = ThemeID;
  protected readonly THEMES = THEMES;
  protected themeIds: ThemeID[] = Object.values(ThemeID);

  selectTheme(themeId: ThemeID){
    this.questionService.theme.set({id: themeId})
    this.selectedTheme = themeId
    if (this.questionService.selectedQuestion() === null){
      this.questionService.goToNext()
    }
    console.log("theme changed: " + themeId)
  }

}
