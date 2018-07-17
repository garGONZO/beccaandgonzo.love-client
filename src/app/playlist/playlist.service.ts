import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from './item';
import { Track } from './track';
import { Album } from './album';
import { Image } from './image';
import { Artist } from './artist';
import { Playlist } from './playlist';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class PlaylistService implements OnInit {

	constructor(private http: HttpClient) {

	}

	ngOnInit(): void {

	}

	getPlaylist(url: string): Observable<Playlist> {
		if (url) {
			return this.http.get<Playlist>('http://localhost:8080/guajardo-wedding-web/api/playlist/?url=' + url).pipe(
				map((playlist: Playlist) => {
					playlist.items.forEach((item: Item) => {
						item.track.onPlaylist = true;
					});
					return playlist;
				})
			);
		} else {
			return this.http.get('http://localhost:8080/guajardo-wedding-web/api/playlist/').pipe(
				map((playlist: Playlist) => {
					playlist.items.forEach((item: Item) => {
						item.track.onPlaylist = true;
					});
					return playlist;
				})
			);
		}
	}

	searchPlaylist(searchString: String): Observable<Item[]> {
		if (searchString) {
			return this.http.get('http://localhost:8080/guajardo-wedding-web/api/playlist/search?queryParameter='
				+ searchString).pipe(
				map((response: Response) => {
					const items: Item[] = new Array<Item>();
					response['tracks']['items'].forEach(item => {
						const currentItem = new Item();
						currentItem.track = new Track();
						currentItem.track.id = item['id'];
						currentItem.track.uri = item['uri'];
						currentItem.track.name = item['name'];
						currentItem.track.preview_url = item['preview_url'];
						currentItem.track.album = new Album(item['album']['images'] as Image[]);
						currentItem.track.artists = new Array<Artist>();
						item['artists'].forEach(artist => {
							currentItem.track.artists.push(new Artist(artist['name']));
						});
						items.push(currentItem);

					});
					return items;
				})
			);
		}
		return null;
	}

	addTrackToPlaylist(track: Track) {
		if (track && !track.onPlaylist) {
			const headers = new HttpHeaders({'Content-Type': 'application/json'});
			return this.http.post('http://localhost:8080/guajardo-wedding-web/api/playlist/add'
				, JSON.stringify({trackUri: track.uri}), {headers: headers}).pipe(
				map((response: Response) => {
					return '';
				})
			);
		}
		return null;
	}

	deleteTrackFromPlaylist(track: Track) {
		if (track) {
			const headers = new HttpHeaders({'Content-Type': 'application/json'});
			return this.http.post('http://localhost:8080/guajardo-wedding-web/api/playlist/delete'
				, JSON.stringify({tracks: [{uri: track.uri}]}), {headers: headers}).pipe(
				map((response: Response) => {
					return '';
				})
			);
		}
		return null;
	}

}
