import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLeadergoalComponent } from './home-leadergoal.component';

describe('HomeLeadergoalComponent', () => {
  let component: HomeLeadergoalComponent;
  let fixture: ComponentFixture<HomeLeadergoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeLeadergoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLeadergoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
