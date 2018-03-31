import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

export interface User {
    uid: string;
    displayName?: string;
    photoURL?: string;

}
@Injectable()
export class TournamentService {
    user: User = {
        uid: this.afAuth.auth.currentUser.uid
    };
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
            if (tournament.adminJoin == true) {
                doc.collection(`users`).doc(tournament.admin).set({
                    name: this.user.displayName,
                    uid: this.user.uid,
                    score: 0
                });
            }

        })
    }

    myTournaments(): Observable<any> {
        return this.afs.collection('tournaments', ref => ref.where('admin', '==', this.user.uid)).snapshotChanges().map(actions => {
            return actions.map(action => {
                const data = action.payload.doc.data();
                const id = action.payload.doc.id;
                return { id, ...data };
            })
        });
    }

    getTournament(id): Observable<any> {
        this.docRef = this.afs.doc(`tournaments/${id}`);
        return this.docRef.valueChanges();
    }

    getUsersByName(name: string): Observable<any> {
        let strSearch = name.toLowerCase();
        let strLength = strSearch.length;
        let strFrontCode = strSearch.slice(0, strLength - 1);
        let strEndCode = strSearch.slice(strLength - 1, strSearch.length);

        let startcode = strSearch;
        let endcode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

        this.colRef = this.afs.collection('users', ref =>
            ref.where('queryName', '>=', startcode)
                .where('queryName', '<', endcode)
        )
        return this.colRef.valueChanges();
    }

    inviteUser(tournamentID: string, user: User) {
        this.docRef = this.afs.collection('users').doc(user.uid).collection('tournamentInvites').doc(tournamentID);

        this.docRef.update({})
            .then(doc => {
            }).catch(err => {
                console.log('doc created')
                this.docRef.set({
                    tid: tournamentID
                });
                this.docRef = this.afs.collection('tournaments').doc(tournamentID).collection('invited').doc(user.uid)
                this.docRef.set({
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                })
            });


    }

    getInvitedUsers(tournamentID: string): Observable<any> {
        this.colRef = this.afs.collection('tournaments').doc(tournamentID).collection('invited');
        return this.colRef.valueChanges();
    }

    invitesPending(): Observable<any> {
        this.colRef = this.afs.collection('users').doc(this.user.uid).collection('tournamentInvites');
        return this.colRef.valueChanges();
    }

    /* alreadyInvited(tournamentID: string, userID: string): Observable<any> {
        this.docRef = this.afs.collection('users').doc(userID).collection('tournamentInvites').doc(tournamentID);
        return this.docRef.valueChanges();
    } */

    joinTournament() {

    }

    getPlayers(tournamentID: string): Observable<any> {
        this.colRef = this.afs.collection('tournament').doc(tournamentID).collection('users');
        return this.colRef.valueChanges();
    }





}