import { Component } from '@angular/core';
import {DropDown} from '../drop-down/drop-down';
import {DEFAULT_LANGUAGE, getCodeLanguage, Language, LANGUAGES} from '../../model/Language';
import {TranslateService} from '@ngx-translate/core';
import {inject} from 'vitest';

@Component({
  selector: 'app-main-layout',
  imports: [DropDown],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

  protected readonly DEFAULT_LANGUAGE = DEFAULT_LANGUAGE;
  protected readonly LANGUAGES = LANGUAGES;
  private translationService: TranslateService;

  constructor(translationService: TranslateService) {
    this.translationService = translationService
  }

  changeLanguage(language: string){
    this.translationService.use(getCodeLanguage(language))
  }

}
