import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-lfgn',
  templateUrl: './lfgn.component.html',
  styleUrls: ['./lfgn.component.css']
})
export class LfgnComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit() { //Revisa si está activa la sesión del usuario y manda a home
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  goLogin() {
    this.router.navigate(['/auth']); //Manda a Login
  }
}