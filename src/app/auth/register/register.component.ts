import {Component, ElementRef, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { Http, Headers, HTTP_PROVIDERS } from '@angular/http';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MD_GRID_LIST_DIRECTIVES} from '@angular2-material/grid-list';
import {MdRadioButton, MdRadioGroup} from '@angular2-material/radio';
import { ShowService } from '../show.service';
import { User }  from '../user';

@Component({
  selector: 'register-form',
  moduleId: module.id,
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
  directives: [
    MD_LIST_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_GRID_LIST_DIRECTIVES,
    MdButton,
    MdInput,
    MdCheckbox,
    MdRadioGroup,
    MdRadioButton,
    MdIcon,
  ],
  providers: [MdIconRegistry, ShowService, Http, HTTP_PROVIDERS],
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
  @ViewChild('passwordd') Password: any;

  constructor(public http: Http, private _displservice: ShowService) { }

  // Called when signup is clicked
  onSubmit(element: HTMLInputElement) {
    this.submitted = true;
    let email = this.model.email;
    let password = this.model.password;
    let username = this.model.username;
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
    this.http.post('https://bucketlist.herokuapp.com/api/register/', params, {
      headers: headers
    })
      .map(res => res.json())
      .subscribe(
      data => this.onComplete(data),
      err => this.logError(err),
      () => console.log('Authentication Complete')
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
    this.signupChange.emit({
      value: true
    })
  }

  // Emit event to signup
  showLogin() {
    this.signupChange.emit({
      value: true
    })
  }
}
