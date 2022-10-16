import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from './post';
import { HttpClient } from '@angular/common/http';
import { POSTS } from '../dummyData/posts.json';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  getPosts() : Observable<Post[]>
  {
    return of(POSTS);
  }
}
