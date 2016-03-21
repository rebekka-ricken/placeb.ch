import {Pipe,Injectable} from 'angular2/core';
import {en} from '../i18n/en';
import {de} from '../i18n/de';

@Pipe({
    name: 'loc'
})
@Injectable()
export class LocalizePipe {

    public locales = {
        'en': en,
        'de': de
    };

    transform(value:any, args:any[]) {

        let locale = args[0];

        return this.locales[locale][value];
    }
}
