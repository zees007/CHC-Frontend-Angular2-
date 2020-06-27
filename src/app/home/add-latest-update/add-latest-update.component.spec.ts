import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLatestUpdateComponent } from './add-latest-update.component';

describe('AddLatestUpdateComponent', () => {
  let component: AddLatestUpdateComponent;
  let fixture: ComponentFixture<AddLatestUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLatestUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLatestUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
