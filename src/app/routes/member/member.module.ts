import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../../material/material.module';

import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { TournamentCreateComponent } from './tournaments/tournament-create/tournament-create.component';
import { TournamentCreateDialogComponent } from './tournaments/tournament-create/tournament-create-dialog/tournament-create-dialog.component';

const memberRoutes: Routes = [
    {
        path: '', component: MemberComponent, children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'tournaments', component: TournamentsComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(memberRoutes),
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        MemberComponent, DashboardComponent, TournamentsComponent, TournamentCreateComponent, TournamentCreateDialogComponent
    ],
    entryComponents: [TournamentCreateDialogComponent],
    providers: []
})
export class MemberModule { }
