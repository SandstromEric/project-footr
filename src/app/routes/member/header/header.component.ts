import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Output() toggleMenu: EventEmitter<any> = new EventEmitter();
    toggled: boolean = true;
    constructor() { }

    ngOnInit() {
        this.toggleMenu.emit(this.toggled);
    }

    menutoggler() {
        this.toggled = !this.toggled;
        this.toggleMenu.emit(this.toggled);
    }
}
