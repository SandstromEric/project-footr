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


const tournamentsRoutes: Routes = [
  {
      path: '', component: TournamentsComponent, children: [
          { path: '', component: TournamentListComponent},
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
  ],
  entryComponents: [TournamentCreateDialogComponent],
  providers: [TournamentService]
})
export class TournamentsModule { }
