import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorRightLeft } from './selector-right-left';

describe('SelectorRightLeft', () => {
  let component: SelectorRightLeft;
  let fixture: ComponentFixture<SelectorRightLeft>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorRightLeft]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorRightLeft);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
