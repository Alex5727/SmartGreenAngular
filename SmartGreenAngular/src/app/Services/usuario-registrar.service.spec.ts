import { TestBed } from '@angular/core/testing';

import { UsuarioRegistrarService } from './usuario-registrar.service';

describe('UsuarioRegistrarService', () => {
  let service: UsuarioRegistrarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioRegistrarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
