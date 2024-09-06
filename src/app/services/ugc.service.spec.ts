import { TestBed } from '@angular/core/testing';

import { UgcService } from './ugc.service';

describe('UgcService', () => {
  let service: UgcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UgcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
