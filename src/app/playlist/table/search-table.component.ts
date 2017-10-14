import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PlaylistService, } from '../playlist.service';
import { Item } from '../item';
import { Track } from '../track';
import { PlaylistTableComponent } from './playlist-table.component';

@Component({
    selector: 'app-search-table',
    templateUrl: './search-table.component.html',
    styles: ['./search-table.component.css'],
    providers: [PlaylistService]
})
export class SearchTableComponent extends PlaylistTableComponent {

    constructor(private searchPlaylistService: PlaylistService) {
        super(searchPlaylistService);
    }

    addTrack(trackToAdd: Track) {
        this.searchPlaylistService.addTrackToPlaylist(trackToAdd).subscribe((response: string) => {
            console.log(response);
        });
    }

}
