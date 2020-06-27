import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentPopUpComponent } from './add-student-pop-up.component';

describe('AddStudentPopUpComponent', () => {
  let component: AddStudentPopUpComponent;
  let fixture: ComponentFixture<AddStudentPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
