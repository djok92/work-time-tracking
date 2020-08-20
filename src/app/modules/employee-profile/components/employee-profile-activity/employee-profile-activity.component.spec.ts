import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProfileActivityComponent } from './employee-profile-activity.component';

describe('EmployeeProfileActivityComponent', () => {
  let component: EmployeeProfileActivityComponent;
  let fixture: ComponentFixture<EmployeeProfileActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeProfileActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProfileActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
