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
export class TournamentService {
    currentUser = this.afAuth.auth.currentUser;
    user: User = {
        uid: this.afAuth.auth.currentUser.uid
    };
    colRef: AngularFirestoreCollection<any>;
    docRef: AngularFirestoreDocument<any>;

    constructor(private db: FirestoreService, private authService: AuthService, private afAuth: AngularFireAuth) {
        this.authService.user.subscribe(user => {
            //console.log(user);
            this.user = user
        });
    }

    createTournament(tournament): void {
        tournament.admin = this.currentUser.uid;
        tournament.contestants = {};
        tournament.invites = {};

        if (tournament.adminJoin) {
            tournament.contestants[tournament.admin] = true;
        }

        this.db.add('tournaments', tournament).then(doc => {
            if(tournament.adminJoin) {
                this.db.set(`${doc.path}/users/${tournament.admin}`, {
                    uid: this.user.uid,
                    photoURL: this.user.photoURL,
                    displayName: this.user.displayName,
                    score: 0
                })
            }
        });
    }

    myTournaments(): Observable<any> {
        return this.db.colWithIds$('tournaments', ref => ref.where(`contestants.${this.currentUser.uid}`, '==', true));
    }

    getTournament(id): Observable<any> {
        return this.db.doc$(`tournaments/${id}`);
    }

    findTournaments(privacy: boolean, league: number, players: Array<number> ): Observable<any> {
        return this.db.colWithIds$('tournaments', ref => ref.where('private', '==', privacy).where('league.id', '==', league).where('players', '>=', players[0]).where('players', '<=', players[1]));
    }

    getUsersByName(name: string): Observable<any[]> {
        let strSearch = name.toLowerCase();
        let strLength = strSearch.length;
        let strFrontCode = strSearch.slice(0, strLength - 1);
        let strEndCode = strSearch.slice(strLength - 1, strSearch.length);

        let startcode = strSearch;
        let endcode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

        return this.db.col$('users', ref => ref.where('queryName', '>=', startcode).where('queryName', '<', endcode));
    }

    inviteUser(tournamentID: string, user: User): void {
        let userKey = {}; userKey[`invites.${user.uid}`] = true;
        this.db.update(`tournaments/${tournamentID}`, userKey);
        this.db.set(`tournaments/${tournamentID}/invites/${user.uid}`, user);
    }

    removeInvitedUser(tournamentID: string, user: User): void {
        let userKeys = {}; userKeys[`invites.${user.uid}`] = false;  
        this.db.update(`tournaments/${tournamentID}`, userKeys);
        this.db.delete(`tournaments/${tournamentID}/invites/${user.uid}`);
    }

    getInvitedUsers(tournamentID: string): Observable<any> {
        return this.db.col$(`tournaments/${tournamentID}/invites`);
    }

    invitesPending(): Observable<any> {
        return this.db.colWithIds$('tournaments', ref => ref.where(`invites.${this.currentUser.uid}`, '==', true));
    }

    acceptInvite(tournamentID: string): void {
        let userKeys = {}; 
        userKeys[`invites.${this.user.uid}`] = false; 
        userKeys[`contestants.${this.user.uid}`] = true;

        this.db.update(`tournaments/${tournamentID}`, userKeys);
        this.db.delete(`tournaments/${tournamentID}/invites/${this.user.uid}`);
        this.db.set(`tournaments/${tournamentID}/users/${this.user.uid}`, {
            ...this.user,
            score: 0
        });
    }

    removeInvite(tournamentID: string): void {
        let userKeys = {}; userKeys[`invites.${this.user.uid}`] = false;  
        this.db.update(`tournaments/${tournamentID}`, userKeys);
        this.db.delete(`tournaments/${tournamentID}/invites/${this.user.uid}`);
    }
    /* alreadyInvited(tournamentID: string, userID: string): Observable<any> {
        this.docRef = this.afs.collection('users').doc(userID).collection('tournamentInvites').doc(tournamentID);
        return this.docRef.valueChanges();
    } */

    /* joinTournament(tournamentID: string) {

    } */

    getPlayers(tournamentID: string): Observable<any> {
        return this.db.col$(`tournaments/${tournamentID}/users`);
    }

    lockPrediction(tournamentID: string, userID: string, fixtureID: number, data) {
        this.db.upsert(`tournaments/${tournamentID}/users/${userID}/predictions/${fixtureID}`, {
            scores: data,
            fixtureID: fixtureID
        })
    }
    getPrediction(tournamentID: string, fixtureID: number, userID: string): Observable<any> {
        return this.db.doc$(`tournaments/${tournamentID}/users/${userID}/predictions/${fixtureID}`);
    }
}