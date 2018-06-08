import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTournamentDialogComponent } from './generate-tournament-dialog.component';

describe('GenerateTournamentDialogComponent', () => {
  let component: GenerateTournamentDialogComponent;
  let fixture: ComponentFixture<GenerateTournamentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateTournamentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateTournamentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
