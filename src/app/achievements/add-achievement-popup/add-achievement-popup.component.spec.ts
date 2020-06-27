import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAchievementPopupComponent } from './add-achievement-popup.component';

describe('AddAchievementPopupComponent', () => {
  let component: AddAchievementPopupComponent;
  let fixture: ComponentFixture<AddAchievementPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAchievementPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAchievementPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
