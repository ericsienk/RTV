import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

    readonly baseRedditUrl = 'https://www.reddit.com/r/videos/';

    constructor(private http: HttpClient) { }
    
    getVideos(subRedditName: string, limit: number, after: number): Observable<Object> {
        return this.http.get(this.baseRedditUrl + subRedditName + '.json');
    }
}
