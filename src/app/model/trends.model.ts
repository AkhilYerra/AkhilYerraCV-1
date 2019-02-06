export class Trends {
    trends: 
        {
            name: string;
            url: string;
            promoted_content: string;
            query: string;
            tweet_volume: number;
        }[];
    as_of: string;
    created_at: string;
    locations: [
        {
            name: string,
            woeid: number
        }
    ]
}
