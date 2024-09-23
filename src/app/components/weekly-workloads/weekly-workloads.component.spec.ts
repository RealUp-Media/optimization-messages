import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyWorkloadsComponent } from './weekly-workloads.component';

describe('WeeklyWorkloadsComponent', () => {
  let component: WeeklyWorkloadsComponent;
  let fixture: ComponentFixture<WeeklyWorkloadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyWorkloadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyWorkloadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
