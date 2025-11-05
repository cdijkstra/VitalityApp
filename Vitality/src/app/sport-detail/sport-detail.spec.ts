import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportDetail } from './sport-detail';

describe('SportDetail', () => {
  let component: SportDetail;
  let fixture: ComponentFixture<SportDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
