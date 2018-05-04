import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { CompetitionsService } from '../../../../shared/competitions.service';
import { ObservableMedia } from '@angular/flex-layout';
import { MemberService } from '../../../../shared/member.service';

interface GridTile {
    header: string;
    buttons?: GridHeaderButton[];
}

interface GridHeaderButton {
    type: string;
    icon: string;
}

@Component({
    selector: 'app-competition-detail',
    templateUrl: './competition-detail.component.html',
    styleUrls: ['./competition-detail.component.scss']
})
export class CompetitionDetailComponent implements OnInit {
    competitionId;
    competition: any;

    gridTiles: GridTile[];
    colspan: number = 4;
    constructor(private route: ActivatedRoute, private router: Router, private cs: CompetitionsService, private ms: MemberService, private media: ObservableMedia) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.cs.setCompetitionId(params.id)
        })

        this.cs.getCompetitionId().subscribe(id => {
            if(id) this.competition = this.cs.getCompetition(id).subscribe(competition => {
                this.ms.setViewTitle(competition.caption);
            })
        })

        this.gridTiles = [
            {header: 'Predictions', buttons: [
                {type: 'path', icon: 'arrow_forward'},
            ]},
            {header: 'Groups', buttons: [
                {type: 'create', icon: 'add'},
                {type: 'path', icon: 'arrow_forward'},
            ]},
            {header: 'Teams'},
            {header: 'Standings'},
        ]

        this.media.subscribe(data => {
            this.updateGridList();
        })
    }

    updateGridList() {
        if(this.media.isActive('xs')) {
            this.colspan = 4;
        } else if(this.media.isActive('md') || this.media.isActive('sm')) {
            this.colspan = 2;
        } else {
            this.colspan = 1;
        }
    }

    tileHeaderButton(tile: GridTile, button: GridHeaderButton) {
        if(button.type === 'path') {
            this.router.navigate([`./${tile.header.toLowerCase()}`], { relativeTo: this.route })
        } else if(button.type === 'create') {

        }
    }

}
