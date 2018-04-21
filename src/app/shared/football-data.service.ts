import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import * as firebase from 'firebase/app';
import { FirestoreService } from './firestore.service';

@Injectable()
export class FootballDataService {

    constructor(private db: FirestoreService, private authService: AuthService, private afAuth: AngularFireAuth) { }

    getCompetitions(): Observable<any> {
        return this.db.col$('footballData/competitions/data');
    }

    getCompetitionFixtures(leagueID): Observable<any[]> {
        return this.db.col$(`footballData/fixtures/data`, ref => (ref.where('competitionID', '==', leagueID).where('status', '==', 'TIMED').orderBy('date')));
    }

    getCompetitionTeams(leagueID): Observable<any[]> {
        return this.db.col$(`footballData/teams/${leagueID}`);
    }
}
