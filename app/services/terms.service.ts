import {Injectable,EventEmitter} from 'angular2/core';
import {httpWrap} from './common/http-wrapper.service';
import {BaseService} from "./base.service";


@Injectable()
export class TermsService extends BaseService {

    public params;

    constructor(public http:httpWrap) {
        super();
        this.getGeneralParameters()
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (res.text) {
                    this.params = res.text;
                }
            })
    }

    getParameters() {
        return this.params;
    }

    getGeneralParameters() {
        return this.http.get(this.termsUrl);
    }
}