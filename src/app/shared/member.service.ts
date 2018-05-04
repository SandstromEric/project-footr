import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MemberService {
    private viewTitle = new Subject<string>();
    private message = new Subject<string>();
    private menuActive = new Subject<boolean>();
    

    constructor() { }

    setMenuActive(isActive: boolean) {
        this.menuActive.next(isActive);
    }

    getMenuActive(): Observable<boolean> {
        return this.menuActive.asObservable();
    }

    setViewTitle(title: string) {
        this.viewTitle.next(title);
    }

    getViewTitle(): Observable<string> {
        return this.viewTitle.asObservable();
    }

    setMessage(message: string) {
        this.message.next(message);
    }

    getMessage(): Observable<string> {
        return this.message.asObservable();
    }
}
