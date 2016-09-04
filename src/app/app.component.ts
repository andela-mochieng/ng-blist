import {Component, OnInit} from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import {AuthHttp, AuthConfig, AUTH_PROVIDERS, JwtHelper} from 'angular2-jwt';
import { SigninComponent } from './auth/signin/signin.component';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  // styleUrls: ['app.component.css'],
  directives: [ SigninComponent, ROUTER_DIRECTIVES ],

})

export class AppComponent implements OnInit {
  constructor(private router: Router) {

  }
    title ="app works";
  // Checks for token expiration to display appropriate page
  ngOnInit() {
  var jwtHelper = new JwtHelper();
  var token = localStorage.getItem('auth_token');
  if (token) {
    console.log(jwtHelper.isTokenExpired(token));
    if (jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['/signin']);
    } else {
      this.router.navigate(['/bucket']);
    }
  } else {
    console.log('signin')
    this.router.navigate(['/signin']);
  }



  }
}
