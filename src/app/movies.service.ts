import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Movie } from './movie';

@Injectable()
export class MoviesService {

  constructor(private http:Http) {
    }

    getAllMovieData():Observable<Movie[]> {
        return this.http.get('https://data.sfgov.org/resource/wwmu-gmzc.json')
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res:Response) {
        let body = res.json();
        return body || [];
    }

    private handleError(error:any) {
        console.error(error);
        return Observable.throw(error);
    }

}

