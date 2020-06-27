import { TestBed } from '@angular/core/testing';

import { EmailreplyService } from './emailreply.service';

describe('EmailreplyService', () => {
  let service: EmailreplyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailreplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
