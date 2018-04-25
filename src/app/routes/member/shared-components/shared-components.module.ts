import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersTableComponent } from './users-table/users-table.component';
import { MaterialModule } from '../../../material/material.module';
import { TournamentFilterListComponent } from './tournament-filter-list/tournament-filter-list.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    UsersTableComponent,
    TournamentFilterListComponent
  ],
  exports: [
    UsersTableComponent,
    TournamentFilterListComponent
  ]
})
export class SharedComponentsModule { }
