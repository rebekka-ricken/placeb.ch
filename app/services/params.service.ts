import {Injectable,EventEmitter} from 'angular2/core';
import {httpWrap} from './common/http-wrapper.service';
import {BaseService} from "./base.service";

declare var Stripe:any;

@Injectable()
export class ParamsService extends BaseService {

    public params;

    public eventEmmitter = new EventEmitter();

    constructor(public http:httpWrap) {
        super();
        this.getGeneralParameters()
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (res.parameters) {
                    Stripe.setPublishableKey(res.parameters.stripePublicKey);
                    this.params = res.parameters;
                    this.eventEmmitter.emit(res.parameters);
                }
            })
    }

    getParameters() {
        return this.params;
    }

    getGeneralParameters() {
        return this.http.get(this.parametersUrl);
    }
}