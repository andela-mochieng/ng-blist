import {Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ROUTER_PROVIDERS  } from '@angular/router-deprecated';
import {AuthHttp, AuthConfig, AUTH_PROVIDERS, JwtHelper} from 'angular2-jwt/';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES,],
  providers: [ROUTER_PROVIDERS ],

})

export class AppComponent implements OnInit {
  constructor() { }
   title = 'Bucket API!';
  // Checks for token expiration to display appropriate page
  ngOnInit() {
  var jwtHelper = new JwtHelper();
  var token = localStorage.getItem('jwt');
  if (token) {
    console.log(jwtHelper.isTokenExpired(token));
    if (jwtHelper.isTokenExpired(token)) {
    console.log('token found');
    } else {
    console.log('token not found');;
    }
  } else {
   console.log('token found');

  }

  }
}
