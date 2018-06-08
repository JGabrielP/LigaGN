import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

@Injectable()
export class AuthService {
  authState: any = null;

  constructor(private afAuth: AngularFireAuth, private router: Router, private firebaseApp: FirebaseApp) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.afAuth.auth.currentUser.getIdToken()
          .then(
          (token: string) => {
            localStorage.setItem('token', token);
            localStorage.setItem('uid', this.afAuth.auth.currentUser.uid);
            localStorage.setItem('email', this.afAuth.auth.currentUser.email);
          }
          )
      })
      .catch(error => {
        throw error
      });
  }

  signOut(): void { //Cierra sesión, elimina las cookies y manda a la página principal
    this.afAuth.auth.signOut();
    localStorage.clear();
    this.router.navigate(['/']);
  }

  isAuthenticated() { // Regresa si el usuario está activo (almacenado en cookie)
    return localStorage.getItem('token') != null;
  }

  getEmail() { // Regresa el email del usuario almacenado en cookie
    return localStorage.getItem('email');
  }

  getUID() { // Regresa el ID del usuario almacenado en cookie
    return localStorage.getItem('uid');
  }

  getProfilePic() { //Obtiene foto de perfil
    const storageRef = this.firebaseApp.storage().ref();
    let imageUrl;
    return storageRef.child("imagesUsers/" +
      this.getEmail() + "/" +
      this.getUID()
    ).getDownloadURL();
  }

  uploadProfilePic(file: File) { //Sube foto de perfil
    const storageRef = this.firebaseApp.storage().ref().child("imagesUsers/" +
      this.getEmail() + "/" +
      this.getUID());
    return storageRef.put(file);
  }
}