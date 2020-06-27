import { TestBed } from '@angular/core/testing';

import { LatestUpdateService } from './latest-update.service';

describe('LatestUpdateService', () => {
  let service: LatestUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatestUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
