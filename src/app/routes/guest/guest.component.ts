import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
@Component({
    selector: 'app-guest',
    templateUrl: './guest.component.html',
    styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {

    }

    signIn() {
        this.authService.googleLogin();
    }

}
