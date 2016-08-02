import { Component, OnInit } from '@angular/core';

import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MD_GRID_LIST_DIRECTIVES} from '@angular2-material/grid-list';
import {MdRadioButton, MdRadioGroup} from '@angular2-material/radio';

@Component({
  moduleId: module.id,
  selector: 'app-bucketlist',
  templateUrl: 'bucketlist.component.html',
  styleUrls: ['bucketlist.component.css'],
  directives: [
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_GRID_LIST_DIRECTIVES,
    MdToolbar,
    MdButton,
    MdInput,
    MdCheckbox,
    MdRadioGroup,
    MdRadioButton,
    MdIcon
  ],
  providers: [MdIconRegistry],
})
export class BucketlistComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
