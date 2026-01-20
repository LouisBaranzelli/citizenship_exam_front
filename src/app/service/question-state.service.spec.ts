/// <reference types="vitest" />
/** @vitest-environment jsdom */

import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { Injector } from '@angular/core';

import { QuestionStateService } from './question-state.service';
import { ApiQuestionService } from './api-question.service';
import {Theme} from '../model/Theme';

describe('QuestionStateService', () => {
  let service: QuestionStateService;

  // Initialise Angular TestBed avec le navigateur dynamique
  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(() => {
    const injector = TestBed.inject(Injector);
    service = new QuestionStateService(new ApiQuestionService(), injector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('selectedQuestion should return null initially', () => {
    expect(service.selectedQuestion()).toBeNull();
    expect(service.historyId().length).toBe(0);
  });

  it('should add a question only when theme exists', async () => {
    // goToNext sans thème -> ne fait rien
    await service.goToNext();
    expect(service.historyId().length).toBe(0);

    // Ajout d’un thème
    const theme1: Theme = { id: "t1" };
    service.theme = theme1;

    // goToNext avec thème -> ajoute la question
    await service.goToNext();
    expect(service.historyId().length).toBe(1);
  });
});
