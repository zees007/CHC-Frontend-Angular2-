import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdmindashboarddataComponent } from './edit-admindashboarddata.component';

describe('EditAdmindashboarddataComponent', () => {
  let component: EditAdmindashboarddataComponent;
  let fixture: ComponentFixture<EditAdmindashboarddataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdmindashboarddataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdmindashboarddataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
