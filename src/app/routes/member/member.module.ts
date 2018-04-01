import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../../material/material.module';

import { TournamentService } from '../../shared/tournament.service';

import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { TournamentCreateComponent } from './tournaments/tournament-create/tournament-create.component';
import { TournamentCreateDialogComponent } from './tournaments/tournament-create/tournament-create-dialog/tournament-create-dialog.component';
import { TournamentDetailComponent, TournamentMessage } from './tournaments/tournament-detail/tournament-detail.component';
import { UsersTableComponent } from './shared-components/users-table/users-table.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './header/navigation/navigation.component';
import { UserComponent } from './header/user/user.component';
import { UserProfileComponent } from './header/user/user-profile/user-profile.component';
import { UserSettingsComponent } from './header/user/user-settings/user-settings.component';

const memberRoutes: Routes = [
    {
        path: '', component: MemberComponent, children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'tournaments', component: TournamentsComponent },
            { path: 'tournaments/:id', component: TournamentDetailComponent },
            { path: 'user-profile', component: UserProfileComponent},
            { path: 'user-settings', component: UserSettingsComponent}
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
        MemberComponent, DashboardComponent, TournamentsComponent, TournamentCreateComponent, TournamentCreateDialogComponent, TournamentDetailComponent, TournamentMessage, UsersTableComponent, HeaderComponent, NavigationComponent, UserComponent, UserProfileComponent, UserSettingsComponent
    ],
    entryComponents: [TournamentCreateDialogComponent, TournamentMessage],
    providers: [TournamentService]
})
export class MemberModule { }
