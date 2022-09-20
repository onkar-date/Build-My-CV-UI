import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTemplateModalComponent } from './change-template-modal.component';

describe('ChangeTemplateModalComponent', () => {
  let component: ChangeTemplateModalComponent;
  let fixture: ComponentFixture<ChangeTemplateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeTemplateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTemplateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
