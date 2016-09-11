import { Injectable } from '@angular/core';
import { Http, Headers, HTTP_PROVIDERS } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Bucketlist } from './blist';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class BucketlistService {

  constructor(public http: Http) {}

  // Api call to create a bucket

  createBucket(list_name: string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
    return this.http.post('https://buckelist.herokuapp.com/api/v.1/bucketlists/', JSON.stringify({ "list_name": list_name }), {

      headers: headers
    })
      .map(res => res.json());

  }

  // Api call to fetch all bucketlists

  getBucketLists(): Observable<Bucketlist[]> {

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
    return this.http.get('https://buckelist.herokuapp.com/api/v.1/bucketlists/', {
      headers: headers
    })
      .map(res => res.json());
  }


// Api call to delete a bucket
  deleteBucket(bid: number): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
    return this.http.delete('https://buckelist.herokuapp.com/api/v.1/bucketlists/' + bid + '/', {
      headers: headers
    });
  }

// Api call to save bucket item
  saveBucketItem(bid: number, item_name: string): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
    return this.http.post('https://buckelist.herokuapp.com/api/v.1/bucketlists/' + bid + '/items/', JSON.stringify({ "item_name": item_name }), {
      headers: headers
    })
      .map(res => res.json());
  }

// Api call to update a bucket item details
  updateItem(item_name: string, bid: number, itemid: number, done: boolean): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
    return this.http.put('https://buckelist.herokuapp.com/api/v.1/bucketlists/' + bid + '/items/' + itemid + '/', JSON.stringify({ 'item_name': item_name, 'done': done }), {
      headers: headers
    })
      .map(res => res.json());
  }

  // Api call to update bucket details
  updateBucket(list_name: string, bid: number): Observable<any> {
    var headers = new Headers();
    console.log('update bucket')
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
    return this.http.put('https://buckelist.herokuapp.com/api/v.1/bucketlists/' + bid + '/', JSON.stringify({ 'list_name': list_name }),  {
      headers: headers
    })

      .map(res => res.json());

  }

  // APi call to delete bucket item
  deleteItem(bid: number, itemid: number): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
    return this.http.delete('https://buckelist.herokuapp.com/api/v.1/bucketlists/' + bid + '/items/' + itemid + '/', {
      headers: headers
    });
  }


}


