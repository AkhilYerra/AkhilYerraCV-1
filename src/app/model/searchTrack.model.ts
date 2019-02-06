import {Track} from './track.model';
export class searchTrack{

  tracks: {
    href: string;
    items: [ Track ];
    limit: number;
    next: null,
    offset: number;
    previous: null;
    total: number
  }
}
