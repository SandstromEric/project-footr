import { Component, OnInit, Input } from '@angular/core';
import { MemberService } from '../../../../../shared/member.service';
import { CompetitionsService } from '../../../../../shared/competitions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-competition-prediction-list',
    templateUrl: './competition-prediction-list.component.html',
    styleUrls: ['./competition-prediction-list.component.scss']
})
export class CompetitionPredictionListComponent implements OnInit {
    competitionId: string;

    games$: any;

    constructor(private cs: CompetitionsService, private ms: MemberService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.cs.getCompetitionId().subscribe(id => id ? this.competitionId = id: null)
        this.route.params.subscribe(params => this.cs.setCompetitionId(params.id))
        this.games$ = this.cs.getCompetitionFixtures(this.competitionId);
    }

}
