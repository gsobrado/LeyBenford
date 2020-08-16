import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private visible = false;

  constructor() { }

  show(){
    this.visible = true;
  }

  hide(){
    setTimeout(() => this.visible = false, 1);
  }

  isVisible(){
    return this.visible;
  }
}
