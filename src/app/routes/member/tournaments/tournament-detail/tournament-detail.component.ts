import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TournamentService } from '../../../../shared/tournament.service';

@Component({
    selector: 'app-tournament-detail',
    templateUrl: './tournament-detail.component.html',
    styleUrls: ['./tournament-detail.component.scss']
})
export class TournamentDetailComponent implements OnInit {

    tournament$: any;

    constructor(private route: ActivatedRoute, private router: Router, private tournamentService: TournamentService) { }
    
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.tournament$ = this.tournamentService.getTournament(params.id);
        })

    }

}
