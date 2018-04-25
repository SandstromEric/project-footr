import { Component, OnInit, ViewChild } from '@angular/core';
import { TournamentService } from '../../../../shared/tournament.service';
import { FootballDataService } from '../../../../shared/football-data.service';

@Component({
    selector: 'app-tournament-finder',
    templateUrl: './tournament-finder.component.html',
    styleUrls: ['./tournament-finder.component.scss']
})
export class TournamentFinderComponent implements OnInit {
    tournaments$: any;
    privacy: boolean = false;
    league: string;
    players: string;

    leagues$: any

    constructor(private tournamentService: TournamentService, private footballService: FootballDataService) { }

    ngOnInit() {
        this.leagues$ = this.footballService.getCompetitions();
    }

}
