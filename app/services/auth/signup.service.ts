import {BaseService} from '../base.service';
import {Inject} from 'angular2/core';
import {httpWrap} from '../common/http-wrapper.service';
import {Injectable} from 'angular2/core';
import {Token} from '../common/token.service';
import {CredentialsSignup} from "../../interfaces/credentials-signup";

@Injectable()
export class Signup extends BaseService {
    constructor(public http: httpWrap, public token: Token) {
        super();
    }

    createUser(data: CredentialsSignup) {
        return this.http.post(
            `${this.registrationUrl}`,
            data
        );
    }
}