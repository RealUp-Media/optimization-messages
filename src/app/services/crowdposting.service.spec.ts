import { TestBed } from '@angular/core/testing';

import { CrowdpostingService } from './crowdposting.service';

describe('CrowdpostingService', () => {
  let service: CrowdpostingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrowdpostingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
