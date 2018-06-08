import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

//Imports Services
import { AuthService } from "./services/auth.service";
import { AuthGuardService } from "./services/auth-guard.service";
import { TeamsService } from "./services/teams/teams.service";
import { TournamentService } from "./services/tournament/tournament.service";

//Imports Angular Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; 
import { MaterialModule } from "./app.material";
import "hammerjs";

//Imports Firebase
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { environment } from "../environments/environment.prod";

//Imports Files
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LfgnComponent } from "./lfgn/lfgn.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { HomeTeamsComponent } from "./home/home-teams/home-teams.component";
import { HomeScheduleComponent } from "./home/home-schedule/home-schedule.component";
import { HomeLeadergoalComponent } from "./home/home-leadergoal/home-leadergoal.component";
import { HomeLeaderboardComponent } from "./home/home-leaderboard/home-leaderboard.component";
import { TeamDialogComponent } from "./dialogs/team-dialog/team-dialog.component";
import { TeamsComponent } from "./home/home-teams/teams/teams.component";
import { DeleteTeamDialogComponent } from "./dialogs/delete-team-dialog/delete-team-dialog.component";
import { EditTeamDialogComponent } from './dialogs/edit-team-dialog/edit-team-dialog.component';
import { GenerateTournamentDialogComponent } from './dialogs/generate-tournament-dialog/generate-tournament-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LfgnComponent,
    LoginComponent,
    HomeComponent,
    HomeTeamsComponent,
    HomeScheduleComponent,
    HomeLeadergoalComponent,
    HomeLeaderboardComponent,
    TeamDialogComponent,
    TeamsComponent,
    DeleteTeamDialogComponent,
    EditTeamDialogComponent,
    GenerateTournamentDialogComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],

  entryComponents: [TeamDialogComponent, DeleteTeamDialogComponent, EditTeamDialogComponent, GenerateTournamentDialogComponent],

  providers: [AuthService, AuthGuardService, TeamsService, TournamentService],
  bootstrap: [AppComponent]
})
export class AppModule {}
