import { TestBed } from '@angular/core/testing';

import { InvernaderosServiceService } from './invernaderos-service.service';

describe('InvernaderosServiceService', () => {
  let service: InvernaderosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvernaderosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
