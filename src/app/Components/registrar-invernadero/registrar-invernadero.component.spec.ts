import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarInvernaderoComponent } from './registrar-invernadero.component';

describe('RegistrarInvernaderoComponent', () => {
  let component: RegistrarInvernaderoComponent;
  let fixture: ComponentFixture<RegistrarInvernaderoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarInvernaderoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarInvernaderoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
