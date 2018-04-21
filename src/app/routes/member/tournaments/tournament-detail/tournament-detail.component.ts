import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TournamentService } from '../../../../shared/tournament.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../../../auth/auth.service';
import { Observable } from '@firebase/util';
import { MatSnackBar } from '@angular/material';
import { FootballDataService } from '../../../../shared/football-data.service';

@Component({
    selector: 'app-tournament-detail',
    templateUrl: './tournament-detail.component.html',
    styleUrls: ['./tournament-detail.component.scss']
})
export class TournamentDetailComponent implements OnInit {

    value: string = "";
    users$: any = this.tournamentService.getUsersByName(this.value);
    tournament$: any;
    tournamentID: string;
    fixtures$: any;
    constructor(private route: ActivatedRoute,
        private router: Router,
        private tournamentService: TournamentService,
        public auth: AuthService,
        private snackBar: MatSnackBar,
        private fooballDataService: FootballDataService,
        private afAuth: AngularFireAuth,
    ) {

    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.tournamentID = params.id;
            this.tournament$ = this.tournamentService.getTournament(this.tournamentID);
            this.tournamentService.getTournament(this.tournamentID).subscribe(data => {
                this.fixtures$ = this.fooballDataService.getCompetitionFixtures(data.league.id);
            })
        })
    
    }

    getUsersByName(): void {
        this.users$ = this.tournamentService.getUsersByName(this.value);
    }

    openMessage(message) {
        this.snackBar.open(message, 'test', {
            duration: 3000,
        })
    }

    filterArray(filterArr, fixtureID) {
        //this.tournamentService.getPrediction(tournamentID, userID, fixtureID);
        //{{predictions.filter(obj => {return obj.fixtureID == match.fixtureID})}}
        //console.log(filterArr.filter(obj => obj["fixtureID"] == fixtureID)[0])
        return filterArr.filter(obj => obj["fixtureID"] == fixtureID)[0];
    }
}

@Component({
    selector: 'snack-bar-component-example-snack',
    template: `
        <span>Testing!</span>
    `,
    styles: [`.example-pizza-party { color: hotpink; }`],
})
export class TournamentMessage {

}
