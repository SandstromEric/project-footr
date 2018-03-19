import { NgModule, OnInit, Input } from '@angular/core';
import { CommonModule, PlatformLocation } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { GuestComponent } from './guest/guest.component';

const routes: Routes = [
    //{ path: '', redirectTo: '/guest', pathMatch: 'full' },
    { path: 'guest', component: GuestComponent },
    { path: 'member', loadChildren: './member/member.module#MemberModule'},
    { path: '**', redirectTo: '/guest', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        CommonModule,
        MaterialModule,
        FormsModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [GuestComponent],
    providers: []
})

export class RoutesModule {

}
