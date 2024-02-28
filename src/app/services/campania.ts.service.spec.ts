import { TestBed } from '@angular/core/testing';

import { CampaniaTsService } from './campania.ts.service';

describe('CampaniaTsService', () => {
  let service: CampaniaTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaniaTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
