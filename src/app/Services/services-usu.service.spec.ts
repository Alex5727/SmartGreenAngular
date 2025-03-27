import { TestBed } from '@angular/core/testing';

import { ServicesUsuService } from './services-usu.service';

describe('ServicesUsuService', () => {
  let service: ServicesUsuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesUsuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
