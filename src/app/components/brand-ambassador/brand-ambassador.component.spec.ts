import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandAmbassadorComponent } from './brand-ambassador.component';

describe('BrandAmbassadorComponent', () => {
  let component: BrandAmbassadorComponent;
  let fixture: ComponentFixture<BrandAmbassadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandAmbassadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandAmbassadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
