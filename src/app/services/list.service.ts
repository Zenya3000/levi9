
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Rx"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';



@Injectable()
export class ListService {
  constructor(
    private http: Http,
  ) {}
  
  getNews(pageNumber) {
    var pass:string = 'http://content.guardianapis.com/search?page='+ pageNumber +'&api-key=test';
    return new Promise((resolve, reject) => {
      this.http
        .get(pass)
        .map(res => res.json())
        // This catch is very powerfull, it can catch all errors
        .catch((err: Response) => {
          // The err.statusText is empty if server down (err.type === 3)
          console.log((err.statusText || "Удаленный сервер не отвечает. (Названия статей)"));
          // Really usefull. The app can't catch this in "(err)" closure
          reject((err.statusText || "Удаленный сервер не отвечает. (Названия статей)"));
          // This return is required to compile but unuseable in your app
          return Observable.throw(err);
        })
        // The (err) => {} param on subscribe can't catch server down error so I keep only the catch
        .subscribe(data => { resolve(data) })
    })
  }

  getArticle(apiUrl){
    console.log('url', apiUrl+'?show-blocks=body&api-key=test');
    return new Promise((resolve, reject) => {
      this.http
        .get(apiUrl +'?show-blocks=body&api-key=test')
        .map(res => res.json())
        // This catch is very powerfull, it can catch all errors
        .catch((err: Response) => {
          // The err.statusText is empty if server down (err.type === 3)
          console.log((err.statusText || "Удаленный сервер не отвечает. (Статьи)"));
          // Really usefull. The app can't catch this in "(err)" closure
          reject((err.statusText || "Удаленный сервер не отвечает. (Статьи)"));
          // This return is required to compile but unuseable in your app
          return Observable.throw(err);
        })
        // The (err) => {} param on subscribe can't catch server down error so I keep only the catch
        .subscribe(data => { resolve(data) })
    })
  }
}
