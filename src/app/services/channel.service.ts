import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    
    public getVideos(subRedditName: string, limit: number, lastVideo: Video): Observable<Video[]> {
        let params = new HttpParams().append('limit', limit.toString());
        if (lastVideo && lastVideo.id) {
            params = params.append('after', 't3_' + lastVideo.id);
        }

        return this.http.get(this.baseRedditUrl + subRedditName + '.json', { params: params }).pipe(
            map(result => {
                return result['data']['children'].map(v => {
                    const data = v['data'];
                    return new Video(
                        data['url'],
                        data['domain'],
                        data['title'],
                        data['id'],
                        data['author']
                    );
                });
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

    public getComments(subRedditName: string, postId): Observable<Comment[]> {
        return this.http.get(this.baseRedditUrl + subRedditName + '/comments/' + postId + '.json').pipe(
            map(result => {
                return this.buildComments(result[1] ? result[1] : {}, 1);
            })
        );
    }
}
