import { Injectable } from '@angular/core';
import 'rxjs/Rx';



@Injectable()
export class ShowService  {
   public static showregister: boolean=true;

  setregister() {
      ShowService.showregister = false;
  }

  getregister(){
      return ShowService.showregister;

  }

}


