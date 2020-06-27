import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewFacultyPopupComponent } from './add-new-faculty-popup.component';

describe('AddNewFacultyPopupComponent', () => {
  let component: AddNewFacultyPopupComponent;
  let fixture: ComponentFixture<AddNewFacultyPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewFacultyPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewFacultyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
