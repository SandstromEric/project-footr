//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';

//Services
import { TournamentService } from '../../../shared/tournament.service';

//Components
import { TournamentsComponent } from './tournaments.component';
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component';
import { TournamentCreateComponent } from './tournament-create/tournament-create.component';
import { TournamentCreateDialogComponent } from './tournament-create/tournament-create-dialog/tournament-create-dialog.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { FootballDataService } from '../../../shared/football-data.service';
import { TournamentMatchesComponent } from './tournament-detail/tournament-matches/tournament-matches.component';
import { TournamentFinderComponent } from './tournament-finder/tournament-finder.component';
import { MatchPredictionFormComponent } from './tournament-detail/tournament-matches/match-prediction-form/match-prediction-form.component';


const tournamentsRoutes: Routes = [
  {
      path: '', component: TournamentsComponent, children: [
          { path: '', component: TournamentListComponent},
          { path: 'finder', component: TournamentFinderComponent },
          { path: ':id', component: TournamentDetailComponent },
      ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(tournamentsRoutes),
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedComponentsModule
  ],
  declarations: [
    TournamentsComponent,
    TournamentDetailComponent,
    TournamentCreateComponent,
    TournamentCreateDialogComponent,
    TournamentListComponent,
    TournamentMatchesComponent,
    TournamentFinderComponent,
    MatchPredictionFormComponent,
  ],
  entryComponents: [TournamentCreateDialogComponent],
  providers: [TournamentService, FootballDataService]
})
export class TournamentsModule { }
