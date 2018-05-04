import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable()
export class FirestoreService {
    constructor(private afs: AngularFirestore) { 
        
    }

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

}
