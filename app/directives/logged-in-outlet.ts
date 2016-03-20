import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';
import {Token} from '../services/common/token.service';

@Directive({
  selector: 'router-outlet'
})
export class LoggedInOutlet extends RouterOutlet {

  publicRoutes: any;
  private parentRouter: Router;

  constructor(
    _elementRef: ElementRef,
    _loader: DynamicComponentLoader,
    _parentRouter: Router,
    @Attribute('name') nameAttr: string,
    private _token: Token
  ) {
    super(_elementRef, _loader, _parentRouter, nameAttr);

    this.parentRouter = _parentRouter;
    this.publicRoutes = {
      '/': true,
      // '': true,
      '/boxes': false,
      '/settings': false
    };

  }

  activate(instruction: ComponentInstruction) {
    var url = this.parentRouter.lastNavigationAttempt; // always "" or "/"
    // console.log(this.parentRouter.lastNavigationAttempt);
    if (!this.publicRoutes[url]
      && !localStorage.getItem('token')
      && (localStorage.getItem('token') && this._token.getUserType() === 'guest') ) {
        // debugger
      this.parentRouter.navigateByUrl('/');
    }
    return super.activate(instruction);
  }

}
