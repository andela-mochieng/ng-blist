import { Http, Headers, HTTP_PROVIDERS } from '@angular/http';
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MD_GRID_LIST_DIRECTIVES} from '@angular2-material/grid-list';
import {MdRadioButton, MdRadioGroup} from '@angular2-material/radio';
import { Router } from '@angular/router';
import { User }  from '../user';
import { ShowService } from '../show.service';

@Component({
  moduleId: module.id,
  selector: 'app-signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['../register/register.component.css'],
  directives: [
    MD_LIST_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_GRID_LIST_DIRECTIVES,
    MdButton,
    MdInput,
    MdCheckbox,
    MdRadioGroup,
    MdRadioButton,
    MdIcon
  ],
  providers: [MdIconRegistry, Http, HTTP_PROVIDERS, ShowService],
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
    this.http.post('https://bucketlist.heroku/api/v.1/login/', params, {
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
