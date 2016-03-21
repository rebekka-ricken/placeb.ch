import {Injectable} from 'angular2/core';

@Injectable()
export class Scroller {
  init (sel: string, callbackHide, callbackShow) {
    var el = document.querySelectorAll(sel)[0];
    var elPos = el.getBoundingClientRect();
    var elTopOffset = elPos.top;
    var elHeight = el.clientHeight;
    var elFullHeight = elHeight + elTopOffset;
    window.onscroll = ((e) => {
      if (window.scrollY >= elFullHeight) {
        callbackHide(window.scrollY);
      }
      if (window.scrollY < elFullHeight) {
        callbackShow(window.scrollY);
      }
    });
  }
  dispose() {
    window.onscroll = null;
  }
}
