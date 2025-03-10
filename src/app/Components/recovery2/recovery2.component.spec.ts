import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recovery2Component } from './recovery2.component';

describe('Recovery2Component', () => {
  let component: Recovery2Component;
  let fixture: ComponentFixture<Recovery2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recovery2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recovery2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
