import { Pipe, PipeTransform } from '@angular/core';
import { TournamentService } from './tournament.service';
import { Observable } from 'rxjs/Observable';
@Pipe({
    name: 'doc'
})
export class DocPipe implements PipeTransform {
    constructor(private tournamentService: TournamentService) {}
    transform(value: any): Observable<any> {
        return this.tournamentService.doc$(value.path);
    }
}
