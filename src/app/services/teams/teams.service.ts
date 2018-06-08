import { Injectable } from "@angular/core";
import { AngularFirestore,
         AngularFirestoreCollection,
         AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from "rxjs";
import { Team } from "../../models/team";
import { FirebaseApp } from "angularfire2";

@Injectable()
export class TeamsService {
  
  public teamsCollection: AngularFirestoreCollection<Team>;
  public teams: Observable<Team[]>;
  public teamDoc: AngularFirestoreDocument<Team>;

  constructor(public afs: AngularFirestore, private firebaseApp: FirebaseApp) {
    this.teamsCollection = this.afs.collection('teams');
    this.teams = this.teamsCollection.valueChanges();
  }

  public getTeams() { //regresa los equipos almacenados en la BD
    return this.teams;
  }

  public addTeam(team: Team) {//agrega un equipo a la BD
    return this.teamsCollection.add(team);
  }

  public deleteTeam(team: Team) {//elimina un equipo de la DB
    this.deleteLogo(team);
    this.teamDoc = this.afs.doc(`teams/${team.id}`);
    this.teamDoc.delete();
  }

  public updateTeam(team: Team) {//actualiza la información del equipo
    this.teamDoc = this.afs.doc(`teams/${team.id}`);
    this.teamDoc.update(team);
  }

  public getImageTeam(teamId: string) { //Obtiene foto de perfil
    const storageRef = this.firebaseApp.storage().ref();
    return storageRef.child("imagesTeams/" + teamId).getDownloadURL();
  }

  public uploadImageTeam(file: File, teamId: string) {//Guarda logo del equipo que se va a agregar a la BD
    const storageRef = this.firebaseApp
      .storage()
      .ref()
      .child("imagesTeams/" + teamId);
      return storageRef.put(file);
  }

  public deleteLogo(team: Team){//Elimina el logo del equipo que será suprimir de la BD
    if(team.ImageUrl.length != 0){
      const storageRef = this.firebaseApp.storage().refFromURL(team.ImageUrl);
      storageRef.delete();
    }
  }

  public ifExists(nameTeam: String){
    let exists = false;
    var citiesRef = this.afs.collection('teams').ref;
    return citiesRef.get()
      .then( snapshot => {
        snapshot.forEach( doc => {
          if(doc.get('Nombre') == nameTeam) {
            exists = true;
          }
        });
        return exists;
      })
  }  
}
