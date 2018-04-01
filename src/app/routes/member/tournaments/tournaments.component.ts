import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TournamentService, Tournament } from '../../../shared/tournament.service';
import { AuthService } from '../../../auth/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-tournaments',
    templateUrl: './tournaments.component.html',
    styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {
    myTournaments$;
    pendingInvites$: Tournament[];
    constructor(public tournamentService: TournamentService, public auth: AuthService) { 

    }

    ngOnInit() {
        this.myTournaments$ = this.tournamentService.myTournaments();

        this.tournamentService.invitesPending().subscribe(data => {
            let invites = [];
            data.forEach(item => {
                this.tournamentService.getTournament(item.tid).subscribe(doc => {
                    if(doc) {
                        invites.push(doc)
                    }
                })
            });
            this.pendingInvites$ = invites;
            console.log(this.pendingInvites$);
        })
    }

    acceptInvite(tournamentID: string) {
        this.tournamentService.acceptInvite(tournamentID);
    }
}
