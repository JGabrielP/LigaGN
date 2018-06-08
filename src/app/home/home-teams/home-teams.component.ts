import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { TeamDialogComponent } from "../../dialogs/team-dialog/team-dialog.component";

@Component({
  selector: "app-home-teams",
  templateUrl: "./home-teams.component.html",
  styleUrls: ["./home-teams.component.css"]
})
export class HomeTeamsComponent implements OnInit {

  public position = "left";

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  public openTeamDialog() {//Habilita el cuadro de dialogo para agregar equipo
    let dialogRef = this.dialog.open(TeamDialogComponent, {
      width: "auto"
    });
  }
}
