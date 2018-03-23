import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog} from '@angular/material';
import { TournamentCreateDialogComponent } from './tournament-create-dialog/tournament-create-dialog.component';
@Component({
    selector: 'app-tournament-create',
    templateUrl: './tournament-create.component.html',
    styleUrls: ['./tournament-create.component.scss']
})
export class TournamentCreateComponent implements OnInit {

    name: string;
    league: boolean;
    private: boolean = false;
    adminJoin: boolean = true;
    players: number = 10;
    
    constructor(public dialog: MatDialog) { }

    ngOnInit() {
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(TournamentCreateDialogComponent, {
            width: '250px',
            disableClose: true,
            autoFocus: true,
            data: { 
                name: this.name, 
                league: this.league,
                private: this.private,
                adminJoin: this.adminJoin,
                players: this.players
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
        });
    }
}
