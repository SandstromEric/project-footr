import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TournamentCreateComponent } from './tournament-create/tournament-create.component';

@Component({
    selector: 'app-tournaments',
    templateUrl: './tournaments.component.html',
    styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {
    animal: string;
    name: string;
    constructor(public dialog: MatDialog) { }

    ngOnInit() {
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(TournamentCreateComponent, {
            width: '250px',
            data: { name: this.name, animal: this.animal }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }
}
