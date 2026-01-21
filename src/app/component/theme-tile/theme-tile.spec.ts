import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeTile } from './theme-tile';

describe('ThemeTile', () => {
  let component: ThemeTile;
  let fixture: ComponentFixture<ThemeTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeTile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeTile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
