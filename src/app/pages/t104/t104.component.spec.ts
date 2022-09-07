import { ComponentFixture, TestBed } from '@angular/core/testing';

import { T104Component } from './t104.component';

describe('T104Component', () => {
  let component: T104Component;
  let fixture: ComponentFixture<T104Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ T104Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(T104Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
