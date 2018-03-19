import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../../material/material.module';

import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const memberRoutes: Routes = [
    {
        path: '', component: MemberComponent, children: [
            { path: '', component: DashboardComponent },
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
        MemberComponent, DashboardComponent
    ],
    providers: []
})
export class MemberModule { }
