import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class GuestGuardService implements CanActivate {
    constructor(private af: AngularFireAuth, private auth: AuthService, private router: Router) { }


    canActivate(): Observable<boolean> {
        return this.af.authState.map(val => {
            if (val) {
                this.router.navigate(['/member/dashboard']);
                console.log(val);
            } 
            return !val
        }).take(1)
    }
}
