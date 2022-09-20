import { ComponentFixture, TestBed } from '@angular/core/testing';

import { T106Component } from './t106.component';

describe('T106Component', () => {
  let component: T106Component;
  let fixture: ComponentFixture<T106Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ T106Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(T106Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
