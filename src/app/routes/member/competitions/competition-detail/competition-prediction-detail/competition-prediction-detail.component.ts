import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { CompetitionsService } from '../../../../../shared/competitions.service';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
    selector: 'app-competition-prediction-detail',
    templateUrl: './competition-prediction-detail.component.html',
    styleUrls: ['./competition-prediction-detail.component.scss']
})
export class CompetitionPredictionDetailComponent implements OnInit {
    @Input() competitionId;
    @Input() game;
    homeGoals: number;
    awayGoals: number;

    curPredictionHomeGoals: number;
    curPredictionAwayGoals: number;

    disabled: boolean = true;
    userId;

    constructor(private cs: CompetitionsService, private afAuth: AngularFireAuth) { 
        this.afAuth.auth.currentUser
    }

    ngOnInit() {
        this.cs.getPrediction(this.game.fixtureID).subscribe(prediction => {
            if (prediction) {
                this.homeGoals = prediction.homeGoals;
                this.awayGoals = prediction.awayGoals;

                this.curPredictionHomeGoals = prediction.homeGoals;
                this.curPredictionAwayGoals = prediction.awayGoals;
            } else {
                this.homeGoals = null;
                this.awayGoals = null;

                this.curPredictionHomeGoals = null;
                this.curPredictionAwayGoals = null;
            }
        });
    }

    setPrediction() {
        let data = {
            homeGoals: this.homeGoals,
            awayGoals: this.awayGoals
        }
        this.cs.setPrediction(this.competitionId, this.game.fixtureID, data);
        this.disabled = true;
    }

    predictionValidation() {
        if (this.curPredictionHomeGoals == this.homeGoals && this.curPredictionAwayGoals == this.awayGoals) {
            this.disabled = true;
        } else if ((this.homeGoals == null || this.homeGoals < 0) || (this.awayGoals == null || this.awayGoals < 0)) {
            this.disabled = true;
        } else {
            this.disabled = false;
        }
    }

    resetPrediction() {
        if (this.homeGoals == null) {
            this.homeGoals = this.curPredictionHomeGoals;
        }

        if(this.awayGoals == null) {
            this.awayGoals = this.curPredictionAwayGoals;
        }
        this.predictionValidation()
    }
}
