import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { TournamentService } from '../../../../../../shared/tournament.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'app-match-prediction-form',
    templateUrl: './match-prediction-form.component.html',
    styleUrls: ['./match-prediction-form.component.scss']
})
export class MatchPredictionFormComponent implements OnInit {
    @Input() fixtureID;
    @Input() tournamentID;
    @Input() match;
    @Input() panelNumber: number;
    @Input() activePanel: number;
    @Output() getPanel: EventEmitter<any> = new EventEmitter(); 

    userID: string = this.afAuth.auth.currentUser.uid;
    prediction: any;
    homeScore: number;
    awayScore: number;
     
    constructor(private tournamentService: TournamentService, private afAuth: AngularFireAuth) { }

    ngOnInit() {
        this.tournamentService.getPrediction(this.tournamentID, this.fixtureID, this.userID).subscribe(data => {
            if(data != undefined) {
                //console.log(data)
                this.prediction = data;
                this.homeScore = data.scores.home;
                this.awayScore = data.scores.away;
            } else {
                this.prediction = null;
            }
        });
    }

    lockPrediction() {
        let scores = {
            home: this.homeScore,
            away: this.awayScore
        }
        this.tournamentService.lockPrediction(this.tournamentID, this.userID, this.fixtureID, scores);
        this.setActivePanel(this.panelNumber + 1);
    }

    setActivePanel(number) {
        this.getPanel.emit(number);
    }

}
