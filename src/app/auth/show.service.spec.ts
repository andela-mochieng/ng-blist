/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ShowService } from './show.service';

describe('Show Service', () => {
  beforeEachProviders(() => [ShowService]);

  it('should ...',
      inject([ShowService], (service: ShowService) => {
    expect(service).toBeTruthy();
  }));
});
