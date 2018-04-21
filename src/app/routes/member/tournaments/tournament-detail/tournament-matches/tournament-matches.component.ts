import { Component, OnInit, Input } from '@angular/core';
import { TournamentService } from '../../../../../shared/tournament.service';
import { FootballDataService } from '../../../../../shared/football-data.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map, mergeMap, merge } from 'rxjs/operators';
import {Observable} from 'rxjs/Rx'
import 'rxjs/add/operator/merge';

@Component({
    selector: 'app-tournament-matches',
    templateUrl: './tournament-matches.component.html',
    styleUrls: ['./tournament-matches.component.scss']
})

export class TournamentMatchesComponent implements OnInit {
    @Input() leagueID: number;
    @Input() tournamentID: string;
    fixtures$: Observable<any>;
    predictions: any;
    combineList$: any;
    activePanel = 0;
    constructor(private tournamentService: TournamentService, private footballService: FootballDataService, private afAuth: AngularFireAuth) { }

    ngOnInit() {
        this.fixtures$ = this.footballService.getCompetitionFixtures(this.leagueID);
    }

    getPrediction(fixtureID) {

    }

    lockPrediction(fixtureID) {
        let data = {};
        this.tournamentService.lockPrediction(this.tournamentID, this.afAuth.auth.currentUser.uid, fixtureID, data)
    }

    trackArray(index, item) {
        return index;
    }
    getPanel($event) {
        this.activePanel = $event;
    }
    /* getFixtureTeams(homeID, awayID): Observable<any[]> {
        let homeTeam:Observable<any> = this.teams$.map(data => data.filter(team => (team.teamID === homeID))[0]);
        let awayTeam:Observable<any> = this.teams$.map(data => data.filter(team => (team.teamID === awayID))[0]);
        return combineLatest<any[]>(homeTeam, awayTeam).pipe(
            map(arr => arr),
        )
    } */
}
