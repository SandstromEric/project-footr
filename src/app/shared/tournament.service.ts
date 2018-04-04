import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import * as firebase from 'firebase/app';
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

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable()
export class TournamentService {
    currentUser = this.afAuth.auth.currentUser;
    user: User = {
        uid: this.afAuth.auth.currentUser.uid
    };
    colRef: AngularFirestoreCollection<any>;
    docRef: AngularFirestoreDocument<any>;

    col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
        return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref
    }

    doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
        return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref
    }

    col$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
        return this.col(ref, queryFn).snapshotChanges().map(docs => {
            return docs.map(a => a.payload.doc.data()) as T[]
        });
    }

    doc$<T>(ref: DocPredicate<T>): Observable<T> {
        return this.doc(ref).snapshotChanges().map(doc => {
            return doc.payload.data() as T
        })
    }

    /// Firebase Server Timestamp
    get timestamp() {
        return firebase.firestore.FieldValue.serverTimestamp()
    }

    set<T>(ref: DocPredicate<T>, data: any) {
        const timestamp = this.timestamp
        return this.doc(ref).set({
            ...data,
            updatedAt: timestamp,
            createdAt: timestamp
        })
    }

    update<T>(ref: DocPredicate<T>, data: any) {
        return this.doc(ref).update({
            ...data,
            updatedAt: this.timestamp
        })
    }

    delete<T>(ref: DocPredicate<T>) {
        return this.doc(ref).delete()
    }

    add<T>(ref: CollectionPredicate<T>, data) {
        const timestamp = this.timestamp
        return this.col(ref).add({
            ...data,
            updatedAt: timestamp,
            createdAt: timestamp
        })
    }

    geopoint(lat: number, lng: number) {
        return new firebase.firestore.GeoPoint(lat, lng)
    }

    /// If doc exists update, otherwise set
    upsert<T>(ref: DocPredicate<T>, data: any) {
        const doc = this.doc(ref).snapshotChanges().take(1).toPromise()

        return doc.then(snap => {
            return snap.payload.exists ? this.update(ref, data) : this.set(ref, data)
        })
    }

    /// with Ids
    colWithIds$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<any[]> {
        return this.col(ref, queryFn).snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });
    }

    docWithRefs$<T>(ref: DocPredicate<T>) {
        return this.doc$(ref).map(doc => {
            for (const k of Object.keys(doc)) {
                if (doc[k] instanceof firebase.firestore.DocumentReference) {
                    doc[k] = this.doc(doc[k].path)
                }
            }
            console.log(doc)
            return doc
        })
    }

    constructor(private afs: AngularFirestore, private authService: AuthService, private afAuth: AngularFireAuth) {
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

        this.add('tournaments', tournament).then(doc => {
            if(tournament.adminJoin) {
                this.set(`${doc.path}/users/${tournament.admin}`, {
                    uid: this.user.uid,
                    photoURL: this.user.photoURL,
                    displayName: this.user.displayName,
                    score: 0
                })
            }
        });
    }

    myTournaments(): Observable<any> {
        return this.colWithIds$('tournaments', ref => ref.where(`contestants.${this.currentUser.uid}`, '==', true));
    }

    getTournament(id): Observable<any> {
        return this.doc$(`tournaments/${id}`);
    }

    getUsersByName(name: string): Observable<any[]> {
        let strSearch = name.toLowerCase();
        let strLength = strSearch.length;
        let strFrontCode = strSearch.slice(0, strLength - 1);
        let strEndCode = strSearch.slice(strLength - 1, strSearch.length);

        let startcode = strSearch;
        let endcode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

        return this.col$('users', ref => ref.where('queryName', '>=', startcode).where('queryName', '<', endcode));
    }

    inviteUser(tournamentID: string, user: User): void {
        let userKey = {}; userKey[`invites.${user.uid}`] = true;
        this.update(`tournaments/${tournamentID}`, userKey);
        this.set(`tournaments/${tournamentID}/invites/${user.uid}`, user);
    }

    removeInvitedUser(tournamentID: string, user: User): void {
        this.delete(`tournaments/${tournamentID}/invites/${user.uid}`);
    }

    getInvitedUsers(tournamentID: string): Observable<any> {
        return this.col$(`tournaments/${tournamentID}/invites`);
    }

    invitesPending(): Observable<any> {
        return this.colWithIds$('tournaments', ref => ref.where(`invites.${this.currentUser.uid}`, '==', true));
    }

    acceptInvite(tournamentID: string): void {
        let userKeys = {}; 
        userKeys[`invites.${this.user.uid}`] = false; 
        userKeys[`contestants.${this.user.uid}`] = true;

        this.update(`tournaments/${tournamentID}`, userKeys);
        this.delete(`tournaments/${tournamentID}/invites/${this.user.uid}`);
        this.set(`tournaments/${tournamentID}/users/${this.user.uid}`, this.user);
    }

    removeInvite(tournamentID: string): void {
        let userKeys = {}; userKeys[`invites.${this.user.uid}`] = false;  
        this.update(`tournaments/${tournamentID}`, userKeys);
        this.delete(`tournaments/${tournamentID}/invites/${this.user.uid}`);
    }
    /* alreadyInvited(tournamentID: string, userID: string): Observable<any> {
        this.docRef = this.afs.collection('users').doc(userID).collection('tournamentInvites').doc(tournamentID);
        return this.docRef.valueChanges();
    } */

    /* joinTournament(tournamentID: string) {

    } */

    getPlayers(tournamentID: string): Observable<any> {
        return this.doc$(`tournaments/${tournamentID}/users`);
    }
}