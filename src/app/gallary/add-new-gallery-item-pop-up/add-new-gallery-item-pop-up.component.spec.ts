import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewGalleryItemPopUpComponent } from './add-new-gallery-item-pop-up.component';

describe('AddNewGalleryItemPopUpComponent', () => {
  let component: AddNewGalleryItemPopUpComponent;
  let fixture: ComponentFixture<AddNewGalleryItemPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewGalleryItemPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewGalleryItemPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
