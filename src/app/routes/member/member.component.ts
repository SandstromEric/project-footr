import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
    user;
    constructor(private authService: AuthService, private afAuth: AngularFireAuth) { }

    ngOnInit() {
        this.authService.user.subscribe(user => {
            this.user = user;
        })
    }

    signOut() {
        this.authService.signOut();
    }
}