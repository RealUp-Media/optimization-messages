import { TestBed } from '@angular/core/testing';

import { EjemploHypeauditorService } from './ejemplo-hypeauditor.service';

describe('EjemploHypeauditorService', () => {
  let service: EjemploHypeauditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjemploHypeauditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
