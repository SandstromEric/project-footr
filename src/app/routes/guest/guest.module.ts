import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../../material/material.module';

import { Routes, RouterModule } from '@angular/router';

import { GuestComponent } from './guest.component';


@NgModule({
  imports: [
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

  ],
  providers: []
})
export class GuestModule { }
