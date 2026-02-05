import { Component } from '@angular/core';
import {DropDown} from '../drop-down/drop-down';
import {findLanguage, getCodeLanguage, Language, LANGUAGES} from '../../model/Language';
import {TranslateService} from '@ngx-translate/core';
import {Tile} from '../tile/tile';
import {ThemeID, THEMES} from '../../model/Theme';
import {ThemeTile} from '../theme-tile/theme-tile';
import {Question} from '../question/question';
import {QuestionStateService} from '../../service/question-state.service';
import {findLevel, Level, LEVELS} from '../../model/Level';

@Component({
  selector: 'app-main-layout',
  imports: [DropDown, Tile, ThemeTile, Question],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

  protected readonly LANGUAGES = LANGUAGES;
  private translationService: TranslateService;
  private questionService: QuestionStateService;

  constructor(translationService: TranslateService, questionService: QuestionStateService) {
    this.translationService = translationService
    this.questionService = questionService
  }

  changeLanguage(language: string){
    this.translationService.use(getCodeLanguage(language))
    this.questionService.language.set(findLanguage(language))

  }

  changeLevel(level: string){
    this.questionService.level.set(findLevel(level))
  }

  protected readonly THEMES = THEMES;
  protected readonly ThemeID = ThemeID;
  protected readonly LEVELS = LEVELS;
}
