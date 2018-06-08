import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { MAT_DIALOG_DATA } from "@angular/material";
import { TournamentService } from "../../services/tournament/tournament.service";

@Component({
  selector: 'app-generate-tournament-dialog',
  templateUrl: './generate-tournament-dialog.component.html',
  styleUrls: ['./generate-tournament-dialog.component.css']
})
export class GenerateTournamentDialogComponent implements OnInit {

  ngOnInit() {}

  constructor(public thisDialogRef: MatDialogRef<GenerateTournamentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public tournamentService: TournamentService) { }

  public onCloseConfirm() {//generar torneo
    this.tournamentService.generate(this.data.arrayTeams);
    this.thisDialogRef.close();
  }

  public onCloseCancel() {//cancela la operación
    this.thisDialogRef.close();
  }
}
