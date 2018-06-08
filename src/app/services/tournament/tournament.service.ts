import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Team } from "../../models/team";
import { Matchweek } from "../../models/matchweek";

@Injectable()
export class TournamentService {

  public matchweekCollection : AngularFirestoreCollection<Matchweek>;
  public teams: Team[];
  public breaker: Team;
  public pair: boolean;

  constructor(public afs: AngularFirestore) {
    this.teams = null;
    this.breaker = {};
    this.pair = true;   
  }

  public generate(teams: Team[]) {//genera el torneo
    this.teams = teams;
    let nTeams: number = this.teams.length;
    this.pairOrOdd(nTeams);

    if (nTeams % 2 == 0){
      nTeams--;
    }

    for (let i = 0; i < nTeams; i++) {
      this.matchweekCollection = this.afs.collection("tournaments").doc("Torneo1").collection("Jornada"+(i+1));
      console.log("*************** JORNADA " + (i + 1) + " *****************");
      this.show();
      this.mix();
    }
  }

  private pairOrOdd(nTeams: number) {//define si el torneo tendrá equipo que descanse
    if (nTeams % 2 != 0) {
      this.pair = false;
      nTeams++;

      this.teams.push({
        Nombre: "Descansa"
      });
      this.breaker = this.teams[nTeams - 1];
    }
  }

  private mix() {//genera los cruces; jornadas y partidos
    var teamBackup: Team = this.teams[this.teams.length - 1];
    for (var i = this.teams.length - 1; i > 1; i--){
      this.teams[i] = this.teams[i - 1];
    }
    this.teams[1] = teamBackup;
  }

  private show() {//muestra los partidos por jornada
    for (var i = 0, j = this.teams.length - 1; i < j; i++, j--) {
      if (!this.pair) {
        if (this.teams[i].Nombre == this.breaker.Nombre)
          {
            console.log("Descansa " + this.teams[j].Nombre);
            this.matchweekCollection.doc("Descansa").set({Descansa: this.teams[j].Nombre});
          }
        else if (this.teams[j].Nombre == this.breaker.Nombre){
          console.log("Descansa " + this.teams[i].Nombre);
          this.matchweekCollection.doc("Descansa").set({Descansa: this.teams[i].Nombre});
        }
        else {
          console.log(this.teams[i].Nombre + " vs " + this.teams[j].Nombre);
          this.matchweekCollection.doc("Partido" + (i+1)).set({Local:this.teams[i].Nombre, Visita: this.teams[j].Nombre});
        }
      } else {
        console.log(this.teams[i].Nombre + " vs " + this.teams[j].Nombre);
        this.matchweekCollection.doc("Partido" + (i+1)).set({Local:this.teams[i].Nombre, Visita: this.teams[j].Nombre});
      }
    }
  }
}
