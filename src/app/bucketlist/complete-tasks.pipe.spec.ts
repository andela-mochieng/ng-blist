/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { CompleteTasksPipe } from './complete-tasks.pipe';

describe('Pipe: CompleteTasks', () => {
  it('create an instance', () => {
    let pipe = new CompleteTasksPipe();
    expect(pipe).toBeTruthy();
  });
});
