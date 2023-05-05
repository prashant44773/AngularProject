import { TestBed } from '@angular/core/testing';

import { PisService } from './pis.service';

describe('PisService', () => {
  let service: PisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
