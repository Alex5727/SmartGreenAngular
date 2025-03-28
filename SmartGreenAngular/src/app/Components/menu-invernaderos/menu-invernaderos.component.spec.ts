import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInvernaderosComponent } from './menu-invernaderos.component';

describe('MenuInvernaderosComponent', () => {
  let component: MenuInvernaderosComponent;
  let fixture: ComponentFixture<MenuInvernaderosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuInvernaderosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuInvernaderosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
