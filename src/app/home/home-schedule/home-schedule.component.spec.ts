import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeScheduleComponent } from './home-schedule.component';

describe('HomeScheduleComponent', () => {
  let component: HomeScheduleComponent;
  let fixture: ComponentFixture<HomeScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
