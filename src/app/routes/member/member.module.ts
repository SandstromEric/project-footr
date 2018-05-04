import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TournamentService } from '../../shared/tournament.service';
import { FirestoreService } from '../../shared/firestore.service';
import { MemberService } from '../../shared/member.service';

import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './header/navigation/navigation.component';
import { UserComponent } from './header/user/user.component';
import { UserProfileComponent } from './header/user/user-profile/user-profile.component';
import { UserSettingsComponent } from './header/user/user-settings/user-settings.component';
import { DocPipe } from '../../shared/doc.pipe';
import { SharedComponentsModule } from './shared-components/shared-components.module';

const memberRoutes: Routes = [
    {
        path: '', component: MemberComponent, children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'tournaments', loadChildren: './tournaments/tournaments.module#TournamentsModule' },
            { path: 'competitions', loadChildren: './competitions/competitions.module#CompetitionsModule' },
            { path: 'user-profile', component: UserProfileComponent },
            { path: 'user-settings', component: UserSettingsComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(memberRoutes),
        CommonModule,
        FormsModule,
        MaterialModule,
        HttpClientModule,
        SharedComponentsModule,
        FlexLayoutModule
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
    providers: [FirestoreService, MemberService]
})
export class MemberModule { }
