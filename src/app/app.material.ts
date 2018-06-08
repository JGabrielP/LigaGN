import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';

@NgModule({
    imports: [MatCardModule, MatIconModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatTabsModule, MatToolbarModule, MatMenuModule, MatTooltipModule, MatDialogModule],
    exports: [MatCardModule, MatIconModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatTabsModule, MatToolbarModule, MatMenuModule, MatTooltipModule, MatDialogModule],
})
export class MaterialModule { }