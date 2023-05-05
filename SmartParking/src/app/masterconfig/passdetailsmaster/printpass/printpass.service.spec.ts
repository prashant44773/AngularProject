import { TestBed } from '@angular/core/testing';

import { PrintpassService } from './printpass.service';

describe('PrintpassService', () => {
  let service: PrintpassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintpassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
