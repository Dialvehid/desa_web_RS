import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from './post';
import { HttpClient } from '@angular/common/http';
import { POSTS } from '../dummyData/posts.json';
import { HOST_BACKEND } from '../config/config';
import { POST_SUCCESS } from '../dummyData/postSuccessfull.json';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  getPosts() : Observable<any>
  {
    return this.httpClient.get<Post[]>(`${HOST_BACKEND}/post`);
    //return of(POSTS);
  }

  crearPost(post: any) : Observable<any>
  {
    //return of(POST_SUCCESS);
    console.log(JSON.stringify(post));
    
    return this.httpClient.post<Post>(`${HOST_BACKEND}/post`, post);
  }

  darLikePost(post: any): Observable<any> {
    console.log(post);
    
    return this.httpClient.post<any>(`${HOST_BACKEND}/react`, post);
  }
}
