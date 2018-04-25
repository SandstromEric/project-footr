import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs/Observable';
@Component({
    selector: 'app-guest',
    templateUrl: './guest.component.html',
    styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {
    user$

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    signIn() {
        this.authService.googleLogin();
    }

}
