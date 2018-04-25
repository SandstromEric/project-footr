import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
    toggled: boolean;
    navLinks = [
        { label: 'Dashboard', path: 'dashboard', icon: 'home' },
        { label: 'Tournaments', path: 'tournaments', icon: 'apps', children: [
            {label: 'Create', icon: 'add', path: 'tournaments', parameter: {create: true}},
            {label: 'Find', icon: 'search', path: 'tournaments/finder'}
        ]},
        {label: 'My profile', path: 'user-profile', icon: 'account_circle'}
    ];
    constructor() { }

    ngOnInit() {

    }

    toggleMenu($event) {
        this.toggled = $event;
    }
}
