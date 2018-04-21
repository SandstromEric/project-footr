import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog} from '@angular/material';
import { TournamentCreateDialogComponent } from './tournament-create-dialog/tournament-create-dialog.component';
import { TournamentService } from '../../../../shared/tournament.service';
import { AuthService } from '../../../../auth/auth.service';

@Component({
    selector: 'app-tournament-create',
    templateUrl: './tournament-create.component.html',
    styleUrls: ['./tournament-create.component.scss']
})
export class TournamentCreateComponent implements OnInit {
    name: string = '';
    league: string = '';
    private: boolean = false;
    adminJoin: boolean = true;
    players: number = 10;

    constructor(public dialog: MatDialog, private tournamentService: TournamentService, private authService: AuthService) {

    }

    ngOnInit() {
        /* this.tournamentService.myTournaments().subscribe(data => {
            console.log(data);
        }); */
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
                players: this.players,
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                let league = result.league.split('_');
                result.league = {
                    id: Number(league[0]),
                    caption: league[1]
                }
                this.tournamentService.createTournament(result);
            }
        });
    }
}
