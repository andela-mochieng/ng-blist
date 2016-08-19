import { Http, Headers, HTTP_PROVIDERS } from '@angular/http';
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import { Router } from '@angular/router';
import { User }  from '../user';
import { ShowService } from '../show.service';


@Component({
  moduleId: module.id,
  selector: 'app-signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['../register/register.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MdInput,
  ],
  providers: [Http, HTTP_PROVIDERS, ShowService],
})

export class SigninComponent implements OnInit {
  public errorMsg = '';
  public arrayOfKeys:any;
  correct = true;
  active = true;
  submitted = false;

    @Output() loginChange = new EventEmitter();
    @Input() register_success: boolean = false;
    @Input() userobj: any;

    model = new User(1, "", "", "", "");


  constructor(public http: Http, private router: Router, private evt: ShowService) {
  }


  onSubmit() {
    this.submitted = true;
    let email = this.model.email;
    let password = this.model.password;
    var params = "username=" + email + "&password=" + password;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('https://buckelist.herokuapp.com/api/v.1/api-token-auth/', params, {
      headers: headers
    })
        .map(res => res.json())
        .subscribe(
            data => this.onComplete(data),
            err => this.logError(err),
            () => console.log(' User authenticated')
        );
  }

  // store auth token on the browser
  onComplete(data:any) {
    localStorage.setItem('auth_token', data["token"]);
    this.router.navigate(['']);
  }

  // close the success alert pop up
  closealert() {
    this.register_success = true;
  }

  showSignUp() {
    this.loginChange.emit({
      value: false
    })
  }
    // Execuit after failed authentication
    logError(err: any) {
    this.correct = false;
    this.userobj = JSON.parse(err["_body"]);
    this.arrayOfKeys = Object.keys(this.userobj);
  }


  ngOnInit() {
    this.register_success = this.evt.getregister();
  }


}
