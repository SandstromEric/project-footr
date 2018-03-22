import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationEnd } from '@angular/router'
import * as firebase from 'firebase/app';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    
    currentRoute = localStorage.getItem('currentRoute');

    constructor(private afAuth: AngularFireAuth, private router: Router) {
        router.events.subscribe((event) => {
            if(event instanceof NavigationEnd) {
                localStorage.setItem('currentRoute', event['url']);
            }
        })
    }
    ngOnInit() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.router.navigate([this.currentRoute]);
            }
        });
    }
}
