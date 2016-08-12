import { Pipe, PipeTransform } from '@angular/core';
import { BucketItem } from './blitems';

@Pipe({
  name: 'completeTasks',
  pure: false
})

export class CompleteTasksPipe implements PipeTransform {

  // Displays only the done items
  transform(allitems: BucketItem[]) {
    return allitems.filter(item => item.done == true);
  }
}
