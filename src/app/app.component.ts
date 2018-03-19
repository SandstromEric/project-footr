import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router'
import * as firebase from 'firebase/app';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    items: Observable<any[]>;
    redirected: boolean = false;

    constructor(db: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) {
        this.items = db.collection('items').valueChanges();
    }
    ngOnInit() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                if(!this.redirected) {
                    this.router.navigate(['/member'])
                    this.redirected == true;
                }
            } else {
                this.router.navigate(['/guest'])
            }
        });
    }
}
