import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { MemberService } from '../../../shared/member.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    menuActive: any;
    constructor(private media: ObservableMedia, private ms: MemberService) { }

    ngOnInit() {
        this.ms.getMenuActive().subscribe(isActive => {
            this.menuActive = isActive;
        });
    }

    menutoggler() {
        this.ms.setMenuActive(!this.menuActive);
    }

}
