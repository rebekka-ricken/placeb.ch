import {Pipe} from 'angular2/core';

@Pipe({
    name: 'amount'
})
export class AmountPipe {

    transform(value:any, args:any[]) {
        if (value == null) {
            return null;
        }
        var temp = value.filter((item) => {
            return item.status === args[0];
        });
        return temp.length;
    }
}
