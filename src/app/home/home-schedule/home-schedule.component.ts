import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material";
import { GenerateTournamentDialogComponent } from "../../dialogs/generate-tournament-dialog/generate-tournament-dialog.component";
import { TeamsService } from "../../services/teams/teams.service";
import { Team } from "../../models/team";

@Component({
  selector: 'app-home-schedule',
  templateUrl: './home-schedule.component.html',
  styleUrls: ['./home-schedule.component.css']
})
export class HomeScheduleComponent implements OnInit {

  public position = "left";
  public teams: Team[];

  constructor(public dialog: MatDialog, public teamService: TeamsService) { }

  ngOnInit() {
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  public openGenerateTournamentDialog() {//Abre el cuadro de dialogo para generar torneo
    let dialogRef = this.dialog.open(GenerateTournamentDialogComponent, {
      width: "auto",
      data: { arrayTeams: this.teams }
    });
  }
}
