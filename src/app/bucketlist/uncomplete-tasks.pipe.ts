import { Pipe, PipeTransform } from '@angular/core';
import { BucketItem } from './blitems';
import { CompleteTasksPipe } from './complete-tasks.pipe';

@Pipe({
  name: 'uncompleteTasks',
  pure: false
})

export class UncompleteTasksPipe extends CompleteTasksPipe {

  // Filters buckets to return completed items
  transform(allitems: BucketItem[]) {
    return allitems.filter(item => item.done == false);
  }
}