import { TestBed } from '@angular/core/testing';

import { PassdetailsService } from './passdetails.service';

describe('PassdetailsService', () => {
  let service: PassdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
