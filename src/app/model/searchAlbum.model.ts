import {Album} from './album.model';
export class searchAlbum{

  albums: {
    href: string;
    items: [ Album ];
    limit: number;
    next: null,
    offset: number;
    previous: null;
    total: number
  }
}
