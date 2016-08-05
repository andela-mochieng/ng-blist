import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uncompleteTasks'
})
export class UncompleteTasksPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
