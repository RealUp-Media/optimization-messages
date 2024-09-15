import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyChecklistComponent } from './daily-checklist.component';

describe('DailyChecklistComponent', () => {
  let component: DailyChecklistComponent;
  let fixture: ComponentFixture<DailyChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyChecklistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
