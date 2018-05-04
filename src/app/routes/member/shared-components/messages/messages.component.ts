import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../../shared/member.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
    message: string;
    constructor(private ms: MemberService, public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.ms.getMessage().subscribe(message => {
            if(message) {
                this.snackBar.open(message, 'Hide', {
                    duration: 3000,
                });
            }
        })
        /* this.snackBar.open("test", "dsad", {
            duration: 3000
        }) */
    }

}
