import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdpostingComponent } from './crowdposting.component';

describe('CrowdpostingComponent', () => {
  let component: CrowdpostingComponent;
  let fixture: ComponentFixture<CrowdpostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrowdpostingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrowdpostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
