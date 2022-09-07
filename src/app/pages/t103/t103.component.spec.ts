import { ComponentFixture, TestBed } from '@angular/core/testing';

import { T103Component } from './t103.component';

describe('T103Component', () => {
  let component: T103Component;
  let fixture: ComponentFixture<T103Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ T103Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(T103Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
