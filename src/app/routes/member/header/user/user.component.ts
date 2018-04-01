import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    user;
    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authService.user.subscribe(user => {
            this.user = user;
        })
    }

    signOut() {
        this.authService.signOut();
    }

}
