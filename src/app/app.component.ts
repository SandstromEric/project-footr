import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationEnd, Route, ActivatedRoute } from '@angular/router'
import * as firebase from 'firebase/app';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    
    /* currentRoute = localStorage.getItem('currentRoute'); */

    constructor(private afAuth: AngularFireAuth, private router: Router, private activatedRoute: ActivatedRoute) {
        /* router.events.subscribe((event) => {
            if(event instanceof NavigationEnd) {
                localStorage.setItem('currentRoute', event['url']);
            }
        }) */
    }
    ngOnInit() {
        /* this.afAuth.authState.subscribe(user => {
            if (user) {
                if(this.router.url === '/guest') {
                    console.log(this.router.url)
                    this.router.navigate(['/member/dashboard'])
                }
            }
        }); */
    }
}
