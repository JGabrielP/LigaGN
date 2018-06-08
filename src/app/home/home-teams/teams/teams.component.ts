import { Component, OnInit } from "@angular/core";
import { Team } from "../../../models/team";
import { TeamsService } from "../../../services/teams/teams.service";
import { MatDialog } from "@angular/material";
import { DeleteTeamDialogComponent } from "../../../dialogs/delete-team-dialog/delete-team-dialog.component";
import { EditTeamDialogComponent } from "../../../dialogs/edit-team-dialog/edit-team-dialog.component";

@Component({
  selector: "app-teams",
  templateUrl: "./teams.component.html",
  styleUrls: ["./teams.component.css"]
})
export class TeamsComponent implements OnInit {
  
  public teams: Team[];
  public position = "below";

  constructor(public teamService: TeamsService, public dialog: MatDialog) {}

  ngOnInit() {//obtener los equipos almacenados en la BD
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  public openDeleteTeamDialog(event, team) {//Habilita el cuadro de dialogo para eliminar equipo seleccionado
    let dialogRef = this.dialog.open(DeleteTeamDialogComponent, {
      width: "auto",
      data: { delTeam: team }//Envía parámetro que especifica el equipo a eliminar
    });
  }

  public openEditTeamDialog(event, team) {//Habilita el cuadro de dialogo para editar el equipo seleccionado  
    let dialogRef = this.dialog.open(EditTeamDialogComponent, {
      width: "auto",
      data: { editTeam: team }//Envía parámetro que especifica el equipo a editar
    });
  }
}
