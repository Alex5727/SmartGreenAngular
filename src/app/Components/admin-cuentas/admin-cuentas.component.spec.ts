import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCuentasComponent } from './admin-cuentas.component';

describe('AdminCuentasComponent', () => {
  let component: AdminCuentasComponent;
  let fixture: ComponentFixture<AdminCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCuentasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
