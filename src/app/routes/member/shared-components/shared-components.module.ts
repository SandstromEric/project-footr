import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersTableComponent } from './users-table/users-table.component';
import { MaterialModule } from '../../../material/material.module';
import { TournamentFilterListComponent } from './tournament-filter-list/tournament-filter-list.component';
import { ViewTitleComponent } from './view-title/view-title.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    UsersTableComponent,
    TournamentFilterListComponent,
    ViewTitleComponent,
    MessagesComponent
  ],
  exports: [
    UsersTableComponent,
    TournamentFilterListComponent,
    ViewTitleComponent,
    MessagesComponent
  ]
})
export class SharedComponentsModule { }
