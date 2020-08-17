import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private visible = false;
  private message : String = "";

  constructor() { }

  show(message : String){
    this.visible = true;
    this.message = message;
  }

  hide(){
    setTimeout(() => this.visible = false, 1);
  }

  isVisible(){
    return this.visible;
  }

  getMessage(){
    return this.message;
  }
}
