import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recovery1Component } from './recovery1.component';

describe('Recovery1Component', () => {
  let component: Recovery1Component;
  let fixture: ComponentFixture<Recovery1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recovery1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recovery1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
