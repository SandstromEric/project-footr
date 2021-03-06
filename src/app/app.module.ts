import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutesModule } from './routes/routes.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AgmCoreModule } from '@agm/core';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/authguard.service';
import { GuestGuardService } from './auth/guestguard.service';
import * as firebase from 'firebase/app';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        RoutesModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
        AngularFireStorageModule, // imports firebase/storage only needed for storage features
        AgmCoreModule.forRoot({
            apiKey: environment.googleMapsKey
        })
    ],
    providers: [AuthService, GuestGuardService, AuthGuardService],
    bootstrap: [AppComponent]
})
export class AppModule { }
