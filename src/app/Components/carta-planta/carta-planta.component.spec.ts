import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaPlantaComponent } from './carta-planta.component';

describe('CartaPlantaComponent', () => {
  let component: CartaPlantaComponent;
  let fixture: ComponentFixture<CartaPlantaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaPlantaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaPlantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
