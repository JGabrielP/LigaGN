import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

import { LoginComponent } from './login/login.component';
import { LfgnComponent } from './lfgn/lfgn.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', redirectTo: 'lfgn', pathMatch: 'full' },
    { path: 'auth', component: LoginComponent },
    { path: 'lfgn', component: LfgnComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }