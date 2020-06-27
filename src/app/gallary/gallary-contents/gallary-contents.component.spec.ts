import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GallaryContentsComponent } from './gallary-contents.component';

describe('GallaryContentsComponent', () => {
  let component: GallaryContentsComponent;
  let fixture: ComponentFixture<GallaryContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GallaryContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GallaryContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
