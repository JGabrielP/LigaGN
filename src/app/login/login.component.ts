import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);
  passFormControl = new FormControl('', [Validators.required]);

  email = '';
  password = '';
  errorMessage = '';
  error: { name: string, message: string } = { name: '', message: '' };

  constructor(public authService: AuthService, public snackBar: MatSnackBar, public router: Router) { }

  ngOnInit() { //Revisa si está activa la sesión del usuario y manda a home
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  clearErrorMessage() { //Limpia mensaje de error de snackbar
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }

  onLoginEmail(): void { //Revisa datos de campos válidos y que datos de usuario estén correctos
    this.clearErrorMessage()
    if (!this.emailFormControl.hasError('required') && !this.emailFormControl.hasError('pattern') && !this.passFormControl.hasError('required')) {
      this.authService.loginWithEmail(this.email, this.password)
        .then(() => this.router.navigate(['/home']))
        .catch(_error => {
          this.error = _error
          this.errorMessage = "No hay registro de usuario correspondiente a los datos introducidos. Revise la información."
          this.openSnackBar(this.errorMessage);
        })
    }
  }

  openSnackBar(messages: string) {
    this.snackBar.open(messages, 'ERROR', {
      duration: 3000
    });
  }
}