import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../../shared/member.service';

@Component({
    selector: 'app-view-title',
    templateUrl: './view-title.component.html',
    styleUrls: ['./view-title.component.scss']
})
export class ViewTitleComponent implements OnInit {
    viewTitle$: any;
    constructor(private ms: MemberService) { }

    ngOnInit() {
        this.ms.getViewTitle().subscribe(title => {
            this.viewTitle$ = title;
        })
    }

}
