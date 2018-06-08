import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { MAT_DIALOG_DATA } from "@angular/material";
import { TeamsService } from "../../services/teams/teams.service";

@Component({
  selector: "app-delete-team-dialog",
  templateUrl: "./delete-team-dialog.component.html",
  styleUrls: ["./delete-team-dialog.component.css"]
})
export class DeleteTeamDialogComponent implements OnInit {
  
  constructor(
    public thisDialogRef: MatDialogRef<DeleteTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teamService: TeamsService
  ) {}

  ngOnInit() {}

  public onCloseConfirm() {//Confirmar la eliminación del equipo
    this.teamService.deleteTeam(this.data.delTeam);
    this.thisDialogRef.close();
  }

  public onCloseCancel() { //Cerrar el cuadro de dialogo eliminar equipo
    this.thisDialogRef.close();
  }
}