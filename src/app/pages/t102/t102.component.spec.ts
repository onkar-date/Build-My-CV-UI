import { ComponentFixture, TestBed } from '@angular/core/testing';

import { T102Component } from './t102.component';

describe('T102Component', () => {
  let component: T102Component;
  let fixture: ComponentFixture<T102Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ T102Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(T102Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
