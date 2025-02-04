import { TestBed } from '@angular/core/testing';

import { DiscoverInfluencersService } from './discover-influencers.service';

describe('DiscoverInfluencersService', () => {
  let service: DiscoverInfluencersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscoverInfluencersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
