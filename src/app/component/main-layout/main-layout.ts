import { Component } from '@angular/core';
import {DropDown} from '../drop-down/drop-down';
import {DEFAULT_LANGUAGE, getCodeLanguage, Language, LANGUAGES} from '../../model/Language';
import {TranslateService} from '@ngx-translate/core';
import {Tile} from '../tile/tile';
import {ThemeID, THEMES} from '../../model/Theme';
import {ThemeTile} from '../theme-tile/theme-tile';

@Component({
  selector: 'app-main-layout',
  imports: [DropDown, Tile, ThemeTile],
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

  protected readonly THEMES = THEMES;
  protected readonly ThemeID = ThemeID;
}
