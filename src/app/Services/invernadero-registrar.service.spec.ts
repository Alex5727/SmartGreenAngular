import { TestBed } from '@angular/core/testing';

import { InvernaderoRegistrarService } from './invernadero-registrar.service';

describe('InvernaderoRegistrarService', () => {
  let service: InvernaderoRegistrarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvernaderoRegistrarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
