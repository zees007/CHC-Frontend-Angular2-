import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGallerydialogComponent } from './add-gallerydialog.component';

describe('AddGallerydialogComponent', () => {
  let component: AddGallerydialogComponent;
  let fixture: ComponentFixture<AddGallerydialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGallerydialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGallerydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
