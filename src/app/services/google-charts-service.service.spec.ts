import { TestBed } from '@angular/core/testing';

import { GoogleChartsServiceService } from './google-charts-service.service';

describe('GoogleChartsServiceService', () => {
  let service: GoogleChartsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleChartsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
