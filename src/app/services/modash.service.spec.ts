import { TestBed } from '@angular/core/testing';

import { ModashService } from './modash.service';

describe('ModashService', () => {
  let service: ModashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
