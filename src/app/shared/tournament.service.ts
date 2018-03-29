import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

export interface User {
    uid: string,
    displayName?: string,
}
@Injectable()
export class TournamentService {
    //test = "OaZFgAR6wWSC8RCXySZysqBCXpI2"
    user: User = {
        uid: this.afAuth.auth.currentUser.uid
    };
    myTournaments$;
    colRef: AngularFirestoreCollection<any>;
    docRef: AngularFirestoreDocument<any>;

    constructor(private afs: AngularFirestore, private authService: AuthService, private afAuth: AngularFireAuth) {
        this.authService.user.subscribe(user => {
            //console.log(user);
            this.user = user
        });
    }

    createTournament(tournament) {
        tournament.admin = this.user.uid;
        this.colRef = this.afs.collection('tournaments');
        this.colRef.add(tournament).then(doc => {
            if(tournament.adminJoin == true) {
                doc.collection(`users`).doc(tournament.admin).set({
                    name: this.user.displayName,
                    uid: this.user.uid,
                    score: 0
                });
            }
            
        })
    }

    myTournaments(): Observable<any> {
        return this.myTournaments$ = this.afs.collection('tournaments', ref => ref.where('admin', '==', this.user.uid)).snapshotChanges().map(actions => {
            return actions.map(action => {
                const data = action.payload.doc.data();
                const id = action.payload.doc.id;
                return { id, ...data };
            })
        });
    }

    getTournament(id):Observable<any> {
        this.docRef = this.afs.doc(`tournaments/${id}`);
        return this.docRef.valueChanges();
    }
}