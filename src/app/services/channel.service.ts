import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

export class Video {
    constructor(
        public url: string,
        public domain: string,
        public title: string,
        public id: string,
        public author: string
    ) {}
}   

export class Comment {
    constructor(
        public id: string,
        public author: string,
        public text: string,
        public replies: Comment[],
        public level: number
    ) {}
}


@Injectable({
  providedIn: 'root'
})
      
export class ChannelService {
    readonly baseRedditUrl = 'https://www.reddit.com/r/';

    constructor(private http: HttpClient) { }
    
    public getVideos(subredditName: string, limit: number, lastVideo: Video): Observable<Video[]> {
        let params = new HttpParams().append('limit', limit.toString()).append('raw_json', '1');
        if (lastVideo && lastVideo.id) {
            params = params.append('after', 't3_' + lastVideo.id);
        }

        return this.http.get(this.baseRedditUrl + subredditName + '.json', { params: params }).pipe(
            flatMap(result => {
                const videos: Video[] = [];

                result['data']['children'].forEach(v => {
                    const data = v['data'];
                    const video = new Video(
                        data['url'],
                        data['domain'],
                        data['title'],
                        data['id'],
                        data['author']
                    );

                    videos.push(video);
                });
                return of(videos);
            })
        );
    }

    private buildComments(responseComment: object, level: number): Comment[] {
        if (responseComment && responseComment['data'] && (responseComment['data']['children'] instanceof Array)) {
            return responseComment['data']['children'].map(c => {
                const data = c['data'] || {};
                return new Comment(
                    data['id'],
                    data['author'],
                    data['body'],
                    this.buildComments(data['replies'], level + 1),
                    level
                );
            });
        } else {
            return [];
        }
    }

    public getComments(postId: string, subRedditName: string): Observable<Comment[]> {
        const params = new HttpParams().append('raw_json', '1');
        return this.http.get(this.baseRedditUrl + subRedditName + '/comments/' + postId + '.json', {params: params}).pipe(
            map(result => {
                return this.buildComments(result[1] ? result[1] : {}, 1);
            })
        );
    }
}
