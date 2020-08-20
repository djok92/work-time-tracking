import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProfileChangeStatusComponent } from './employee-profile-change-status.component';

describe('EmployeeProfileChangeStatusComponent', () => {
  let component: EmployeeProfileChangeStatusComponent;
  let fixture: ComponentFixture<EmployeeProfileChangeStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeProfileChangeStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProfileChangeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
