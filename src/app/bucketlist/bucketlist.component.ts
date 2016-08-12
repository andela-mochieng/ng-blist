import {Component, ElementRef, Input, Output, EventEmitter, OnInit, ViewContainerRef, ViewChild, AfterViewInit} from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MdRadioButton, MdRadioGroup} from '@angular2-material/radio';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {AuthHttp, AuthConfig, AUTH_PROVIDERS, JwtHelper} from 'angular2-jwt';
import { MODAL_DIRECTIVES, ModalComponent, ModalResult} from 'ng2-bs3-modal/ng2-bs3-modal';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import {CanActivate} from '@angular/router-deprecated';
import { SigninComponent } from '../auth/signin';
import { RegisterComponent } from '../auth/register';
import { BucketlistService } from './bucketlist.service';
import { Bucketlist } from './blist';
import { BucketItem } from './blitems';
import { CompleteTasksPipe } from './complete-tasks.pipe';
import { SearchPipe } from './search.pipe';
import { UncompleteTasksPipe } from './uncomplete-tasks.pipe';



@Component({
  moduleId: module.id,
  selector: 'app-bucketlist',
  templateUrl: 'bucketlist.component.html',
  styleUrls: ['bucketlist.component.css'],
  directives: [
    MD_SIDENAV_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdToolbar,
    MdButton,
    MdInput,
    MdCheckbox,
    MdRadioGroup,
    MdRadioButton,
    MdIcon,
    RegisterComponent,
    MODAL_DIRECTIVES
  ],
  providers: [MdIconRegistry, HTTP_PROVIDERS, MODAL_DIRECTIVES, ToastsManager, BucketlistService ],
  pipes: [CompleteTasksPipe, SearchPipe, UncompleteTasksPipe],
})
export class BucketlistComponent implements OnInit {
  openPage: string;
  editing = false;
  nobuckets = false;
  noitems = false;
  currentTitle: string;
  visible: boolean = false;
  editMode = false;
  index: number = 0;
  bucketname: string;
  private bctlst: Bucketlist[];


  @Input() bucketlist: Bucketlist[];
  @Input() bucketitem: BucketItem[];
  @Input() bucket: Bucketlist;
  @Input() itemcount: number;
  @Input() username: any;
  @Input() email: any;
  @Input() querystring: any;
  @Input() hasItems: boolean = false;
  @Input() public selectedBucket: Bucketlist;
  @Input() public selectdeleteItem: BucketItem;
  @Input() public selectedCurrentText: string;

  constructor(private el: ElementRef, private _router: Router, private bucketService: BucketlistService, public toastr: ToastsManager) {
    this.openPage = "signin";

  }

  @ViewChild('myModal')
  modal: ModalComponent;

  @ViewChild('modalconfirm')
  confirmmodal: ModalComponent;

  @ViewChild('modalconfirmitem')
  confirmmodalitem: ModalComponent;

  @ViewChild('bucketitemid')
  bitemid: any;


  // Opens modal
  open() {
    this.modal.open();
    this.bitemid.nativeElement.value = "";

  }
  // Gets user eg. name object .
  getUser() {
    var jwtHelper = new JwtHelper();
    var token = localStorage.getItem('auth_token');
    return jwtHelper.decodeToken(token)
  }


  // Execute on modal closed
  onClose(result: ModalResult) {
    this.createBucketList(this.bucketname);
  }

  // Triggered when searching bucket list
  onKey(value: string) {
    this.querystring = value;
  }

  // Shows search bar when user intents to search
  entersearch(searchinput: HTMLInputElement, searchicon: HTMLInputElement) {
    searchinput.style.display = "block";
    searchinput.focus();
    searchicon.style.display = "none";
  }

   // Execute on successful bucketlist  creation
  onCreateBucket(data: any) {
    this.fetchbuckets();
  }

  // Service called to create bucketlists
  createBucketList(bucketname: string) {
    this.bucketService.createBucket(bucketname).subscribe(
      data => this.onCreateBucket(data),
      err => this.logError(err),
      () => console.log('Added successful')
    );
  }

  // Service  call to fetch bucketlists
  fetchbuckets() {
    this.bucketService.getBucketLists().subscribe(
      data => this.onComplete(data),
      err => this.logError(err),
      () => console.log('Complete')
    );
  }

  // Refresh  bucketlists once a save is made
  onSaveItem(data: any) {
    this.fetchbuckets();
  }

  // Executed when user selects a bucketlist
  onSelect(bucketitem: Bucketlist, s: number) {
    this.visible = false;
    this.itemcount = Object.keys(bucketitem.items).length;
    if (this.itemcount > 0) {
      this.noitems = false;
    } else {
      this.noitems = true;
    }
    this.selectedBucket = bucketitem;
    this.index = s;
    console.log('index')
    console.log(this.index)
    console.log(this.selectedBucket);
  }



  // Executed when an error occurs on Api call
  onComplete(data: any) {
    this.bucketlist = data;
    console.log('item cray')
    console.log(data)
    console.log(this.bucketlist[this.index])
    var num = Object.keys(data).length;
    if (num > 0) {
      this.nobuckets = false;
      this.selectedBucket = this.bucketlist[this.index];
      this.itemcount = Object.keys(this.selectedBucket.items).length;
      if (this.itemcount > 0) {
        this.noitems = false;
      } else {
        this.noitems = true;

      }
    } else {
      this.nobuckets = true;
      this.selectedBucket = this.bucketlist[this.index - 1];
    }

  }

  // Executed when an error occurs on Api call
  logError(err: any) {
    if (String(err['_body']).indexOf('unique') > 0) {
      this.toastr.error("Already exists");
    }
    if (err['status'] == 403) {
      console.log(err['_body']);
      console.log('crayz')
      this._router.navigate(['index']);
    }
  }

  // If user is autheticated allow them to edit their bucketlists. Get their email
  // and username Set the the search/querystring none
   ngOnInit() {
    var token = localStorage.getItem('auth_token');
    if (token) {
      this.fetchbuckets();
      this.username = this.getUser()['username'];
      this.email = this.getUser()['email'];
      this.querystring = "";
    } else {
      this._router.navigate(['bucket']);
    }
  }
  // Dismisses editing interface
  cancelEdit(element: HTMLInputElement, labelitem: HTMLInputElement, bucket: Bucketlist) {
    this.editMode = false;
    element.style.display = "none";
    labelitem.style.display = "block";
    this.selectedBucket = bucket;
  }

  // Commits an edit to bucketitem
  commitEdit(updatedText: string, element: HTMLInputElement, labelitem: HTMLInputElement, bucketitem: BucketItem) {
    this.editMode = false;
    element.style.display = "none";
    labelitem.style.display = "block";
    if (updatedText.length > 0) {
      bucketitem.item_name = updatedText;
      if (this.selectedCurrentText != updatedText) {
        this.updateItem(bucketitem, bucketitem.done);
      }
    } else {
      this.toastr.error('The bucketitem cannot be blank', 'Oops!');
    }

  }

  // Calls service to update a bucket
  updateBucket(bucket: Bucketlist, list_name: string) {
    this.bucketService.updateBucket(list_name, bucket.id).subscribe(
      data => this.onUpdateComplete(data),
      err => this.logError(err),
      () => console.log('Authentication Complete')
    );
  }

  // Commits an edit to bucket list
  commitEditBucketList(updatedText: string, element: HTMLInputElement, labelitem: HTMLInputElement, bucket: Bucketlist) {
    console.log('shit')
    this.editMode = false;
    console.log(element)
    element.style.display = "none";
    console.log(bucket)
    console.log(labelitem)
    labelitem.style.display = "block";
    console.log('before')
    if (updatedText.length > 0) {
      bucket.list_name = updatedText;
      this.selectedBucket = bucket;
      if (this.selectedCurrentText != updatedText) {
        console.log('if')
        this.updateBucket(bucket, updatedText);
      }
    } else {
      console.log('else')
      this.toastr.error('The bucketlist list_name cannot be blank', 'Oops!');
    }

  }

  // Shows interface for editing bucket item
  enterEditMode(element: HTMLInputElement, labelitem: HTMLInputElement, selectedCurrentText: string) {
    console.log(element);
    element.style.display = "block";
    element.focus();
    this.selectedCurrentText = selectedCurrentText;
    labelitem.style.display = "none";
    if (this.editMode) {
      setTimeout(() => { element.focus(); }, 0);
    }
  }

  // Shows interface for editing bucket list

  editModeBucket(element: HTMLInputElement, labelitem: HTMLInputElement, selectedCurrentText: string) {
    console.log('jvc')
    console.log(labelitem)
    console.log('selectedCurrentText');
    element.style.display = "block";
    element.focus();
    this.selectedCurrentText = selectedCurrentText;
    labelitem.style.display = "none";
    if (this.editMode) {
      setTimeout(() => { element.focus(); }, 0);
    }
  }

  // Shows confirmation message for deleting an item/bucketlist
  deletetrigger() {
    this.confirmmodal.open();
  }
  deleteitemtrigger(selectdeleteItem: BucketItem) {
    this.selectdeleteItem = selectdeleteItem
    this.confirmmodalitem.open();
  }

  onDeleteBucket() {
    console.log("bucketlist deleted");
    this.bucketService.getBucketLists().subscribe(
      data => this.onDeleteComplete(data),
      err => this.logError(err),
      () => console.log('Complete')
    );
  }
  // Calls service to delete bucketlist
  deleteBucketList() {
    this.bucketService.deleteBucket(this.selectedBucket.id).subscribe(
      data => this.onDeleteBucket(),
      err => this.logError(err),
      () => console.log('Complete')
    );
  }

  // Calls service to update bucketitem
  updateItem(item: BucketItem, done: boolean) {
    this.bucketService.updateItem(item.item_name, this.selectedBucket.id, item.id, done).subscribe(
      data => this.onUpdateComplete(data),
      err => this.logError(err),
      () => console.log('Complete')
    );
  }

  // Refreshes bucketlist once update complete
  onUpdateComplete(data: any) {
    this.fetchbuckets();
  }

  // Api call to add a new item
  addItem(itemname: string, element: HTMLInputElement) {
    element.value = "";
    var token = localStorage.getItem('auth_token');
    if (token) {
      this.bucketService.saveBucketItem(this.selectedBucket.id, itemname).subscribe(
        data => this.onSaveItem(data),
        err => this.logError(err),
        () => console.log('Add successful')
      );
    }
  }



  // Navigates user to login page
  logOut() {
    localStorage.removeItem('auth_token');
    this._router.navigate(['/']);
  }



  // Calls service to delete bucket item
  deleteItem() {
    var bucketitem = this.selectdeleteItem;
    this.bucketService.deleteItem(this.selectedBucket.id, bucketitem.id).subscribe(
      data => this.fetchbuckets(),
      err => this.logError(err),
      () => console.log('Authentication Complete')
    );
  }

  // Toggles between completed and uncompleted items
  toggle(bucketitem: BucketItem) {
    bucketitem.done = !bucketitem.done;
    this.updateItem(bucketitem, bucketitem.done);
  }
  toggle_done(bucketitem: BucketItem) {
    bucketitem.done = !bucketitem.done;
    this.updateItem(bucketitem, bucketitem.done);
  }



  // Displays completed items label
  showCompleted(element: HTMLInputElement) {
    this.visible = !this.visible;
    if (this.visible) {
      element.innerHTML = "HIDE ITEMS COMPLETED";
    } else {
      element.innerHTML = "SHOW ITEMS COMPLETED";
    }
  }


  onDeleteComplete(data: any) {
    console.log(data);
    this.bucketlist = data;
    var num = Object.keys(data).length;
    if (num > 0) {
      this.nobuckets = false;
      this.selectedBucket = this.bucketlist[this.index - 1];
      this.itemcount = Object.keys(this.selectedBucket.items).length;
      if (this.itemcount > 0) {
        this.noitems = false;
      } else {
        this.noitems = true;
      }
    } else {
      this.nobuckets = true;
      this.selectedBucket = this.bucketlist[this.index - 1];
    }

  }

}

