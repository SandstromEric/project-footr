import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';

interface CompetitionGroup {
    name: string;
    players: number;
    maxPlayers: number;
    privacy: string;
    competitionId: string;
    geopoint: {
        lat: string;
        lng: string;
    }
}

@Injectable()
export class CompetitionGroupService {

    constructor(private db: FirestoreService) { }
    
    createGroup(data) {

    }
}
1