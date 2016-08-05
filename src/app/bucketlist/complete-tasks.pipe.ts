import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'completeTasks'
})
export class CompleteTasksPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
