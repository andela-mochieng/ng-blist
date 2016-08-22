import {Component, ElementRef, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { Http, Headers, HTTP_PROVIDERS } from '@angular/http';
import { Router } from '@angular/router';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import { ShowService } from '../show.service';
import { User }  from '../user';

@Component({
  selector: 'register-form',
  moduleId: module.id,
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MdInput,

  ],
  providers: [ShowService, Http, HTTP_PROVIDERS],
})

export class RegisterComponent {

  public arrayOfKeys: any;
  public errorMsg = '';
  active = true;
  submitted = false;
  correct = true;

  @Output() signupChange = new EventEmitter();
  @Input() userobj: any;

  model = new User(1, "", "", "", "")
  @ViewChild('confirmPassword') confirmPassword: any;
  @ViewChild('password') Password: any;

  constructor(public http: Http, private _displservice: ShowService, private router: Router) { }

  // Called when signup is clicked
  onSubmit(element: HTMLInputElement) {
    console.log('element', element)
    this.submitted = true;
    let username = this.model.username;
    let email = this.model.email;
    let password = this.model.password;
    let confirm_password = this.model.confirm_password;
    if (confirm_password != password) {
      element.setCustomValidity("Passwords do not match");
    } else {
      this.sendRequest(email, username, password, confirm_password);
    }

  }
  validateConfirm(element: HTMLInputElement, element2: HTMLInputElement) {
    if (element.value != element2.value && (element2.value.length > 0)) {
      return false;
    }
    return true;
  }

  // Api request to sign up
  sendRequest(email: any, username: any, password: any, confirm_password: any) {
    var params = "email=" + email + "&password=" + password +
      "&username=" + username + "&confirm_password=" + confirm_password;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('https://buckelist.herokuapp.com/api/v.1/register/', params, {
      headers: headers
    })
      .map(res => res.json())
      .subscribe(
      data => this.onComplete(data),
      err => this.logError(err),
      () => console.log('Authenticated')
      );
  }

  // Executed when request is unsuccessful
  logError(err: any) {
    this.correct = false;
    this.userobj = JSON.parse(err["_body"]);
    this.arrayOfKeys = Object.keys(this.userobj);
  }

  // Executed when request is successful
  onComplete(data: any) {
    this._displservice.setregister();
    this.router.navigate(['/signin']);
    this.signupChange.emit({
      value: true
    })
  }


  // Emit event to signup
  showLogin() {
    this.router.navigate(['/signin']);
    this.signupChange.emit({
      value: true
    })
  }
}
