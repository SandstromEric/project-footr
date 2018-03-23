import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-tournament-create',
    templateUrl: './tournament-create.component.html',
    styleUrls: ['./tournament-create.component.scss']
})
export class TournamentCreateComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<TournamentCreateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }



    ngOnInit() {
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
}
