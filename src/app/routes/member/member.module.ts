import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../../material/material.module';

import { TournamentService } from '../../shared/tournament.service';

import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './header/navigation/navigation.component';
import { UserComponent } from './header/user/user.component';
import { UserProfileComponent } from './header/user/user-profile/user-profile.component';
import { UserSettingsComponent } from './header/user/user-settings/user-settings.component';
import { DocPipe } from '../../shared/doc.pipe';

const memberRoutes: Routes = [
    {
        path: '', component: MemberComponent, children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'tournaments', loadChildren: './tournaments/tournaments.module#TournamentsModule' },
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
        HttpClientModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        MemberComponent, 
        DashboardComponent, 
        HeaderComponent, 
        NavigationComponent, 
        UserComponent, 
        UserProfileComponent, 
        UserSettingsComponent, 
        DocPipe
    ],
    providers: []
})
export class MemberModule { }
