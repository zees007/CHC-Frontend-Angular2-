import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestimonialPopupComponent } from './add-testimonial-popup.component';

describe('AddTestimonialPopupComponent', () => {
  let component: AddTestimonialPopupComponent;
  let fixture: ComponentFixture<AddTestimonialPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTestimonialPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTestimonialPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
