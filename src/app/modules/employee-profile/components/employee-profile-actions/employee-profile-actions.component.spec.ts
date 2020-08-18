import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProfileActionsComponent } from './employee-profile-actions.component';

describe('EmployeeProfileActionsComponent', () => {
  let component: EmployeeProfileActionsComponent;
  let fixture: ComponentFixture<EmployeeProfileActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeProfileActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProfileActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
