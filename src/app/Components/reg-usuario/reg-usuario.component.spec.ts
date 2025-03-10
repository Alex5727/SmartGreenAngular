import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegUsuarioComponent } from './reg-usuario.component';

describe('RegUsuarioComponent', () => {
  let component: RegUsuarioComponent;
  let fixture: ComponentFixture<RegUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
