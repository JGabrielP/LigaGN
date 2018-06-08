import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { MAT_DIALOG_DATA } from "@angular/material";
import { FormControl, Validators } from '@angular/forms';
import { Team } from "../../models/team";
import { TeamsService } from "../../services/teams/teams.service";

const TEXT_REGEX = /^\S+(?: \S+)*$/;

@Component({
  selector: "app-team-dialog",
  templateUrl: "./team-dialog.component.html",
  styleUrls: ["./team-dialog.component.css"]
})
export class TeamDialogComponent implements OnInit {

  public teamFormControl;
  public team: Team = {
    id:"",
    Nombre: "",
    ImageUrl: ""
  };
  public image: File;

  constructor(public thisDialogRef: MatDialogRef<TeamDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: string, private teamService: TeamsService) {}

  ngOnInit() {
    this.teamFormControl = new FormControl('', [Validators.required, Validators.pattern(TEXT_REGEX)], this.ifTeamExists.bind(this));
  }

  public onCloseConfirm() {//agregar equipo
    if (!this.teamFormControl.hasError('required') && !this.teamFormControl.hasError('pattern') && !this.teamFormControl.hasError('exists')) {
      if (this.image != null) {
        this.teamService.addTeam(this.team)//agrega el equipo a la BD
          .then(teamAdded => this.team.id = teamAdded.id)//obtiene el ID generado por la BD y la asigna
          .then(x => this.uploadImageTeam(this.team.id))//guarda el logotipo del equipo, como nombre el ID del equipo agregado
          .then(url => this.team.ImageUrl = url)//obtiene la ubicación del logotipo del equipo
          .then(y => this.teamService.updateTeam(this.team))//actualiza con la nueva información del equipo (id, imageUrl)
      } else {
        this.teamService.addTeam(this.team)//agrega equipo
          .then(teamAdded => this.team.id = teamAdded.id)//obtiene el ID generado por Firebase y la asigna
          .then(y => this.teamService.updateTeam(this.team))//actualiza con la nueva información
      }
      this.thisDialogRef.close();//cerrar cuadro de dialogo
    }
  }

  public onCloseCancel() {//cancela la operación
    this.thisDialogRef.close();
  }

  public imageSet($event) {//establece imagen seleccionado de GetElement
    this.image = $event.target.files[0];
  }

  public uploadImageTeam(id: string) {//Sube foto de equipo en base a su ID
    return this.teamService
      .uploadImageTeam(this.image, id)
      .then(x => {
        return this.teamService
          .getImageTeam(id)
          .then(url => { return url })
        }
      );
  }

  public ifTeamExists(formcontrol: FormControl) {
    return this.teamService.ifExists(this.team.Nombre).then(res => {
      if(res){
        return {exists: true};
      }else{
        return {exists: false};
      }
    });
  }
}
