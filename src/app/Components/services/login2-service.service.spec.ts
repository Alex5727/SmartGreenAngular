import { TestBed } from '@angular/core/testing';

import { Login2ServiceService } from './login2-service.service';

describe('Login2ServiceService', () => {
  let service: Login2ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Login2ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
