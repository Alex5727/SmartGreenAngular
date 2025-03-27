import { TestBed } from '@angular/core/testing';

import { ServicesInvService } from './services-inv.service';

describe('ServicesInvService', () => {
  let service: ServicesInvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesInvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
