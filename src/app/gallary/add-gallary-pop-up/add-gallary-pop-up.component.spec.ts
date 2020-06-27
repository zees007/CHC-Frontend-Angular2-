import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGallaryPopUpComponent } from './add-gallary-pop-up.component';

describe('AddGallaryPopUpComponent', () => {
  let component: AddGallaryPopUpComponent;
  let fixture: ComponentFixture<AddGallaryPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGallaryPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGallaryPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
