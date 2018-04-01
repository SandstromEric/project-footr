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

export interface Tournament {
    admin: string;
    adminJoin: boolean;
    name: string;
    private: boolean;
    league: string;
    players: number;
}

@Injectable()
export class TournamentService {
    currentUser = this.afAuth.auth.currentUser;
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
        tournament.admin = this.currentUser.uid;
        this.colRef = this.afs.collection('tournaments');
        this.colRef.add(tournament).then(doc => {
            if (tournament.adminJoin == true) {
                doc.collection(`users`).doc(tournament.admin).set({
                    uid: this.currentUser.uid,
                    displayName: this.currentUser.displayName,
                    photoURL: this.currentUser.photoURL,
                    email: this.currentUser.email,
                    score: 0
                });
            }

        })
    }

    myTournaments(): Observable<any> {
        return this.afs.collection('tournaments', ref => ref.where('admin', '==', this.currentUser.uid)).snapshotChanges().map(actions => {
            return actions.map(action => {
                const data = action.payload.doc.data();
                const id = action.payload.doc.id;
                return { id, ...data };
            })
        });
    }

    getTournament(id): Observable<any> {
        this.docRef = this.afs.doc(`tournaments/${id}`);
        return this.docRef.snapshotChanges().map(action => {
            const data = action.payload.data();
            const id = action.payload.id;
            return { id, ...data };
        });
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

    inviteUser(tournamentID: string, user: User): void {
        this.afs.collection('users').doc(user.uid).collection('tournamentInvites').doc(tournamentID).set({
            tid: tournamentID
        });;

        this.afs.collection('tournaments').doc(tournamentID).collection('invited').doc(user.uid).set({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
        })

    }

    removeInvitedUser(tournamentID: string, user: User): void {
        this.afs.collection('tournaments').doc(tournamentID).collection('invited').doc(user.uid).delete();
        this.afs.collection('users').doc(user.uid).collection('tournamentInvites').doc(tournamentID).delete();
    }

    getInvitedUsers(tournamentID: string): Observable<any> {
        this.colRef = this.afs.collection('tournaments').doc(tournamentID).collection('invited');
        return this.colRef.valueChanges();
    }

    invitesPending(): Observable<any> {
        this.colRef = this.afs.collection('users').doc(this.currentUser.uid).collection('tournamentInvites');
        return this.colRef.valueChanges();
    }

    acceptInvite(tournamentID: string) {
        this.afs.collection('users').doc(this.currentUser.uid).collection('tournamentInvites').doc(tournamentID).delete();
        this.afs.collection('tournaments').doc(tournamentID).collection('users').doc(this.currentUser.uid).set({
            uid: this.currentUser.uid,
            displayName: this.currentUser.displayName,
            photoURL: this.currentUser.photoURL,
            email: this.currentUser.email,
            score: 0
        });
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