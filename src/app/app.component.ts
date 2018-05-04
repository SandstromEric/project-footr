import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationEnd, Route, ActivatedRoute } from '@angular/router'
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {

    constructor(private afAuth: AngularFireAuth, private router: Router, private activatedRoute: ActivatedRoute, private afs: AngularFirestore) {
        afs.firestore.settings({timestampsInSnapshots: true})
    }
    ngOnInit() {

    }
}
