import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContactDetailsModalComponent } from './update-contact-details-modal.component';

describe('UpdateContactDetailsModalComponent', () => {
  let component: UpdateContactDetailsModalComponent;
  let fixture: ComponentFixture<UpdateContactDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateContactDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateContactDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
