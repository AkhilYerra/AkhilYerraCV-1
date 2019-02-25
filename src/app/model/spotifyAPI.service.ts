import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Artist} from './artist.model'
import {searchArtist} from './searchArtist.model'
import {searchTrack} from './searchTrack.model'
import { searchAlbum } from './searchAlbum.model';
import { Album } from './album.model';


@Injectable()
export class SpotifyService {

  constructor(private http: HttpClient) { }

  searchArtist(id: string){
    console.log(`${environment.api}/artists${id}`)
     return this.http.get<Artist>(`${environment.api}/artists${id}`)
  }
  searchAlbum(id : string){
    console.log(`${environment.api}/albums${id}`)
    return this.http.get<Album>(`${environment.api}/albums${id}`)
  }

  searchArtistByName(id: string){
    console.log(`${environment.api}/searchArtist${id}`)
     return this.http.get<searchArtist>(`${environment.api}/searchArtist${id}`)
  }

  searchSongByName(id: string){
    console.log(`${environment.api}/searchSong${id}`)
    console.log(process.env.PORT);
     return this.http.get<searchTrack>(`${environment.api}/searchSong${id}`)
  }

  searchAlbumByName(id: string){
    console.log(`${environment.api}/searchAlbum${id}`)
     return this.http.get<searchAlbum>(`${environment.api}/searchAlbum${id}`)
  }
}