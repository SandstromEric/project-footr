import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../../auth/auth.service';
import { FootballDataService } from '../../../../../shared/football-data.service';
@Component({
    selector: 'app-tournament-create-dialog',
    templateUrl: './tournament-create-dialog.component.html',
    styleUrls: ['./tournament-create-dialog.component.scss']
})
export class TournamentCreateDialogComponent implements OnInit {

    form: FormGroup;

    name: string;
    league: string;
    private: boolean;
    adminJoin: boolean;
    players: number;

    leagues$;
    constructor(
        private footballDataService: FootballDataService,
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<TournamentCreateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        ) {
            
            this.name = data.name;
            this.league = data.league;
            this.private = data.private;
            this.adminJoin = data.adminJoin;
            this.players = data.players;
        }

    ngOnInit() {
        this.leagues$ = this.footballDataService.getCompetitions();
        this.form = this.fb.group({
            name: [this.name, []],
            league: [this.league, []],
            private: [this.private, []],
            adminJoin: [this.adminJoin, []],
            players: [this.players, []]
        });
        
    }
    save(): void {
        
        if(this.form.valid) {
            this.dialogRef.close(this.form.value);
        }
    }

}
