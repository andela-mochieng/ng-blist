/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { UncompleteTasksPipe } from './uncomplete-tasks.pipe';

describe('Pipe: UncompleteTasks', () => {
  it('create an instance', () => {
    let pipe = new UncompleteTasksPipe();
    expect(pipe).toBeTruthy();
  });
});
