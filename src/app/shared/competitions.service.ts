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
import { MemberService } from './member.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
/* import { DocPipe } from './doc.pipe'; */

export interface User {
    uid: string;
    displayName?: string;
    photoURL?: string;
}

export interface Tournament {
    admin: string;
    adminJoin: boolean;
    name: string;
    private: boolean;
    league: string;
    players: number;
}



@Injectable()
export class CompetitionsService {
    userId: string;
    private curCompetitionId = new BehaviorSubject<string>(null);
    private curCompetition = new BehaviorSubject<any>(null);
    constructor(private db: FirestoreService, private authService: AuthService, private afAuth: AngularFireAuth, private ms: MemberService, private route: ActivatedRoute) {
        this.authService.user.subscribe(user => {
            if(user) this.userId = user.uid;
        })
    }

    setCompetitionId(id: string) {
        this.curCompetitionId.next(id);
    }

    getCompetitionId(): Observable<string> {
        return this.curCompetitionId.asObservable();
    }


    getCompetitions(): Observable<any> {
        return this.db.col$('footballData/competitions/data');
    }

    getCompetition(id): Observable<any> {
        return this.db.doc$(`footballData/competitions/data/${id}`);
    }
    
    getCompetitionFixtures(id): Observable<any[]> {
        return this.db.col$(`footballData/fixtures/data`, ref => (ref.where('competitionID', '==', Number(id)).where('status', '==', 'TIMED').orderBy('date')));
    }

    setPrediction(competitionId: number, fixtureId: number, data: any) {
        this.db.upsert(`users/${this.userId}/predictions/${fixtureId}`, {
            ...data,
            competitionId: competitionId
        }).then(doc => {
            this.ms.setMessage("Prediction set!")
        })
    }

    getPrediction(fixtureId: number): Observable<any> {
        return this.db.doc$(`users/${this.userId}/predictions/${fixtureId}`);
    }

}