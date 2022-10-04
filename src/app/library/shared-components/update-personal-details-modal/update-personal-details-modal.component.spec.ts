import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePersonalDetailsModalComponent } from './update-personal-details-modal.component';

describe('UpdatePersonalDetailsModalComponent', () => {
  let component: UpdatePersonalDetailsModalComponent;
  let fixture: ComponentFixture<UpdatePersonalDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePersonalDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePersonalDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
