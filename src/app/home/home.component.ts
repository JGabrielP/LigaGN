import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HomeTeamsComponent } from './home-teams/home-teams.component';
import { HomeScheduleComponent } from './home-schedule/home-schedule.component';
import { HomeLeaderboardComponent } from './home-leaderboard/home-leaderboard.component';
import { HomeLeadergoalComponent } from './home-leadergoal/home-leadergoal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public position = 'below';
  public imageUrl: string;

  constructor(public authService: AuthService) {
    authService.getProfilePic().then(url => this.imageUrl = url); // Carga foto de perfil de usuario
  }

  ngOnInit() {
  }
  
  public logout() { //Cerrar sesión
    this.authService.signOut();
  }

  public uploadProfilePic($event) { //Sube foto de perfil de usuario
    let file: File = $event.target.files[0];
    this.authService.uploadProfilePic(file)
      .then(x => this.authService.getProfilePic().then(url => this.imageUrl = url));
  }
}