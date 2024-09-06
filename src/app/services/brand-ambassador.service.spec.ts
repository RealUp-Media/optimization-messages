import { TestBed } from '@angular/core/testing';

import { BrandAmbassadorService } from './brand-ambassador.service';

describe('BrandAmbassadorService', () => {
  let service: BrandAmbassadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandAmbassadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
