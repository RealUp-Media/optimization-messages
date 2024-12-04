import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInfluencerComponent } from './add-influencer.component';

describe('AddInfluencerComponent', () => {
  let component: AddInfluencerComponent;
  let fixture: ComponentFixture<AddInfluencerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInfluencerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInfluencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
