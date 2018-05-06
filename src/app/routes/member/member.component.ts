import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { ObservableMedia } from '@angular/flex-layout';
import { MemberService } from '../../shared/member.service';

interface Links {
    label: string,
    path: string,
    icon: string,
    parameters?: any,
    children?: Array<Links>
}

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
    menuActive$: any;
    mode: string;
    navLinks: Links[] = [
        { label: 'Dashboard', path: 'dashboard', icon: 'home' },
        { label: 'Competitions', path: 'competitions', icon: 'apps' },
        { label: 'Leaderboards', path: 'leaderboards', icon: 'stars', /* children: [
            { label: 'World', path: 'leaderboards/world', icon: 'star_rate' },
            { label: 'Region', path: 'leaderboards/country', icon: 'star_rate' },
            { label: 'Local', path: 'leaderboards/local', icon: 'star_rate' },
            { label: 'Groups', path: 'leaderboards/groups', icon: 'star_rate' },
        ] */ },
        { label: 'My profile', path: 'user-profile', icon: 'account_circle' },
    ];
    constructor(private media: ObservableMedia, private ms: MemberService) { }

    ngOnInit() {
        this.menuActive$ = this.ms.getMenuActive();
        this.media.subscribe(data => {
            this.changeSideNavMode();
        })
    }

    /* toggleMenu($event) {
        this.menuActive = $event;
    } */

    changeSideNavMode() {
        if (this.media.isActive('xs') || this.media.isActive('sm')) {
            this.mode = 'open';
            this.ms.setMenuActive(false);
        } else {
            this.mode = 'side';
            this.ms.setMenuActive(true);
        }
    }

    menuOnClose() {
        this.ms.setMenuActive(false);
    }
}
