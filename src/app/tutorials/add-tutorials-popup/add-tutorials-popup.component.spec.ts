import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTutorialsPopupComponent } from './add-tutorials-popup.component';

describe('AddTutorialsPopupComponent', () => {
  let component: AddTutorialsPopupComponent;
  let fixture: ComponentFixture<AddTutorialsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTutorialsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTutorialsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
