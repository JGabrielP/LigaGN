import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LfgnComponent } from './lfgn.component';

describe('LfgnComponent', () => {
  let component: LfgnComponent;
  let fixture: ComponentFixture<LfgnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LfgnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LfgnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
