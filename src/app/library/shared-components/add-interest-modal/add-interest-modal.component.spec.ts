import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterestModalComponent } from './add-interest-modal.component';

describe('AddInterestModalComponent', () => {
  let component: AddInterestModalComponent;
  let fixture: ComponentFixture<AddInterestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInterestModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInterestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
