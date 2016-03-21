import {Pipe} from 'angular2/core';

@Pipe({
    name: 'customCurrency'
})
export class CustomCurrencyPipe {

    /**
     * @param value any
     * @param args array
     * @returns {string}
     */
    transform(value:any, args:any[]) {

        var temp;

        temp = value ? parseFloat(value) : 0;

        return temp.toFixed(2) + ' ' + args[0];
    }
}
