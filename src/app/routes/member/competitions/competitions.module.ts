import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../../../material/material.module';
import { RouterModule, Router, Routes } from '@angular/router';
import { CompetitionsService } from '../../../shared/competitions.service';

import { CompetitionsComponent } from './competitions.component';
import { CompetitionListComponent } from './competition-list/competition-list.component';
import { CompetitionDetailComponent } from './competition-detail/competition-detail.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { CompetitionPredictionListComponent } from './competition-predictions/competition-prediction-list/competition-prediction-list.component';
import { CompetitionPredictionDetailComponent } from './competition-predictions/competition-prediction-detail/competition-prediction-detail.component';
import { CompetitionGroupListComponent } from './competition-groups/competition-group-list/competition-group-list.component';


const competitionsRoutes: Routes = [
    {
        path: '', component: CompetitionsComponent, children: [
            { path: '', component: CompetitionListComponent},
            { path: ':id', component: CompetitionDetailComponent},
            { path: ':id/predictions', component: CompetitionPredictionListComponent},
            { path: ':id/groups', component: CompetitionGroupListComponent}
              
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(competitionsRoutes),
        CommonModule,
        FormsModule,
        MaterialModule,
        HttpClientModule,
        SharedComponentsModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
      CompetitionsComponent,
      CompetitionListComponent,
      CompetitionDetailComponent,
      CompetitionPredictionListComponent,
      CompetitionPredictionDetailComponent,
      CompetitionGroupListComponent
    ],
    providers: [CompetitionsService]
})
export class CompetitionsModule { }
