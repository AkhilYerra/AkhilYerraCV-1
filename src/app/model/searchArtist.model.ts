import {Artist} from './artist.model';
export class searchArtist{

  artists: {
    href: string;
    items: [ Artist ];
    limit: number;
    next: null,
    offset: number;
    previous: null;
    total: number
  }
}
