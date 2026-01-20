import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ApiQuestionService } from './api-question.service';

describe('ApiQuestionService', () => {
  let service: ApiQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
