import {Inject, Injectable} from '@angular/core';
import {MyHttpService} from "./my-http.service";
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class BlogService {

  constructor(private http: MyHttpService,
              @Inject('APP_API_URL') private apiUrl: string) {

  }


  createPost(title: string,
             content: string,
             publishDate: string
              ) {
    const queryUrl = `${this.apiUrl}posts/create/`;
    let data = {title: title, content: content, publish: publishDate};
    return this.http.post(queryUrl, JSON.stringify(data))
      .map(response => response.json())
      .catch(this.handle_error);
  }

  listPosts() {
    const queryUrl = `${this.apiUrl}posts/`;
    return this.http.get(queryUrl)
      .map(response => response.json())
      .catch(this.handle_error);
  }

  getPost(slug: string) {
    const queryUrl = `${this.apiUrl}posts/${slug}/`;
    return this.http.get(queryUrl)
      .map(response => response.json())
      .catch(this.handle_error);
  }

  updatePost( slug: string,
              title: string,
              content: string,
              publishDate: string) {
    const queryUrl = `${this.apiUrl}posts/${slug}/`;
    let data = {title: title, content: content, publish: publishDate};
    return this.http.put(queryUrl, JSON.stringify(data))
      .map(response => response.json())
      .catch(this.handle_error);
  }

  deletePost(slug: string) {
    const queryUrl = `${this.apiUrl}posts/${slug}/`;
    return this.http.delete(queryUrl)
      .map(response => response.json())
      .catch(this.handle_error);
  }


  private handle_error(error: any): any {
    return Observable.throw(error.json());
  }



}
