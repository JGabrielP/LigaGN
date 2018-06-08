import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { MAT_DIALOG_DATA } from "@angular/material";
import { FormControl, Validators } from '@angular/forms';
import { Team } from "../../models/team";
import { TeamsService } from "../../services/teams/teams.service";

const TEXT_REGEX = /^\S+(?: \S+)*$/;

@Component({
  selector: "app-edit-team-dialog",
  templateUrl: "./edit-team-dialog.component.html",
  styleUrls: ["./edit-team-dialog.component.css"]
})
export class EditTeamDialogComponent implements OnInit {

  public teamFormControl = new FormControl('', [Validators.required, Validators.pattern(TEXT_REGEX)]);//expresión regular para validar nombre de equipos
  public team: Team = {
            id: "",
            Nombre: "",
            ImageUrl: ""
          };
  public image: File;
  public teamBackup: Team;

  constructor(
    public thisDialogRef: MatDialogRef<EditTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teamService: TeamsService){
      this.teamBackup = data.editTeam;
      this.team.id = this.data.editTeam.id;
      this.team.Nombre = this.data.editTeam.Nombre;
      this.team.ImageUrl = this.data.editTeam.ImageUrl;
    }

  ngOnInit() {}

  public onCloseConfirm() {//Confirmar la edición del equipo
    if (!this.teamFormControl.hasError('required') && !this.teamFormControl.hasError('pattern')) {
      if (this.image != null) {
        this.uploadImageTeam()//sube el logotipo nuevo del equipo
          .then(x => this.teamService.updateTeam(this.team))//actualiza el equipo con la nueva información (imageUrl, Nombre)
      } else {
        this.teamService.updateTeam(this.team);//actualiza el equipo con la nueva información
      }
      this.thisDialogRef.close();
    }
  }

  public onCloseCancel() {//cancela la operación
    this.thisDialogRef.close();
  }

  public imageSet($event) {//establece imagen seleccionado de GetElement
    this.image = $event.target.files[0];
  }

  public uploadImageTeam() {//Sube el nuevo logo de equipo
    this.teamService.deleteLogo(this.teamBackup);//elimina el logo antiguo del equipo
    let idTeam = this.team.id;
    return this.teamService //agrega el nuevo logo del equipo
      .uploadImageTeam(this.image, idTeam)
      .then(x =>
        this.teamService
          .getImageTeam(idTeam)
          .then(url => (this.team.ImageUrl = url))
      );
  }
}
