export class Album{
        album_type : string;
        artists : [ {
          external_urls : {
            spotify : string
          },
          href : string
          id : string
          name : string
          type : string
          uri : string
        } ];
        available_markets : [ string];
        copyrights : [ {
          text : string;
          type : string;
        } ];
        external_ids : {
          upc : number
        };
        external_urls : {
          spotify : string
        };
        genres : [string];
        href : string
        id : string
        images : {
          height : number
          url : string
          width : 640
        }[];
        name : string
        popularity : number
        release_date : number
        release_date_precision : string
        tracks : {
          href : string
          items : {
            artists : [ {
              external_urls : {
                spotify : string
              },
              href : string
              id : string
              name : string
              type : string
              uri : string
            } ],
            available_markets : [string];
            disc_number : number
            duration_ms : number
            explicit : boolean
            external_urls : {
              spotify : string
            },
            href : string
            id : string
            name : string
            preview_url : string
            track_number : number
            type : string
            uri : string
          }
          } [];
          limit : number
          next : string
          offset : number
          previous : string
          total : number
        
        type : string
        uri : string
}
