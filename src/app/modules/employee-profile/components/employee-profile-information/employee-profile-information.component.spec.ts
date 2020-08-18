import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProfileInformationComponent } from './employee-profile-information.component';

describe('EmployeeProfileInformationComponent', () => {
  let component: EmployeeProfileInformationComponent;
  let fixture: ComponentFixture<EmployeeProfileInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeProfileInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProfileInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
