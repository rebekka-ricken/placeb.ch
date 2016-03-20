import {Pipe} from 'angular2/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe {
  transform(value: any, args: any[]) {
    if (value == null) {
      return null;
    }
    var filtered = value.filter((item) => { return item.unit === 'month'; })
    var minPrice: number = filtered[0].price;
    for (var i = 0; i < filtered.length; i++) {
      if (filtered[i].price < minPrice) {
        minPrice = filtered[i].price;
      }
    }
    return minPrice;
  }
}
