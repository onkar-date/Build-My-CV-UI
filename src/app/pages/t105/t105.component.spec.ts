import { ComponentFixture, TestBed } from '@angular/core/testing';

import { T105Component } from './t105.component';

describe('T105Component', () => {
  let component: T105Component;
  let fixture: ComponentFixture<T105Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ T105Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(T105Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
