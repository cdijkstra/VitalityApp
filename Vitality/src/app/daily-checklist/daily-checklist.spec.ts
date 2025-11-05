import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyChecklist } from './daily-checklist';

describe('DailyChecklist', () => {
  let component: DailyChecklist;
  let fixture: ComponentFixture<DailyChecklist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyChecklist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyChecklist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
