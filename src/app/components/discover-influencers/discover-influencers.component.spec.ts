import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverInfluencersComponent } from './discover-influencers.component';

describe('DiscoverInfluencersComponent', () => {
  let component: DiscoverInfluencersComponent;
  let fixture: ComponentFixture<DiscoverInfluencersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverInfluencersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoverInfluencersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
