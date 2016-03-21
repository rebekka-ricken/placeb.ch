import {Injectable} from 'angular2/core';
import {httpWrap} from './common/http-wrapper.service';
import {BaseService} from "./base.service";

@Injectable()
export class StripeService extends BaseService {
    constructor(public http:httpWrap) {
        super();
    }
}