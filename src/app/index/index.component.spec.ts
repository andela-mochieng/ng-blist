/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { IndexComponent } from './index.component';

describe('Component: Index', () => {
  it('should create an instance', () => {
    let component = new IndexComponent();
    expect(component).toBeTruthy();
  });
});
