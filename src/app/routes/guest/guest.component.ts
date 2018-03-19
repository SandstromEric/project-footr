import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
@Component({
    selector: 'app-guest',
    templateUrl: './guest.component.html',
    styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {

    constructor(private authService: AuthService) { }

    ngOnInit() {

    }

    signIn() {
        this.authService.googleLogin();
    }

}
