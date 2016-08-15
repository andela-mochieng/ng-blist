import { Pipe, PipeTransform } from '@angular/core';
import { Bucketlist } from './blist';

@Pipe({
  name: 'searchFilter',
  pure: false
})
export class SearchPipe implements PipeTransform {
// Returns bucketlist matching query
  transform(bucketlist: Bucketlist[], args: any): any {
      if (bucketlist == null) {
          return null;
      }
      console.log('search', args)
    return bucketlist.filter((item: Bucketlist) => new RegExp(args).test(item.list_name));
  }

}

