import { TestBed } from '@angular/core/testing';

import { AgencyMasterService } from './agency-master.service';

describe('AgencyMasterService', () => {
  let service: AgencyMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgencyMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
