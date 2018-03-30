import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TournamentService } from '../../../shared/tournament.service';
import { AuthService } from '../../../auth/auth.service';
import { Observable } from '@firebase/util';

@Component({
    selector: 'app-tournaments',
    templateUrl: './tournaments.component.html',
    styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {
    myTournaments$;
    constructor(public tournamentService: TournamentService, public auth: AuthService) { 

    }

    ngOnInit() {
        this.myTournaments$ = this.tournamentService.myTournaments();
    }

}
