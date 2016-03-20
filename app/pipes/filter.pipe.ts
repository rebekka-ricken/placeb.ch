import {Pipe} from 'angular2/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe {
  transform(value: any, args: any[]) {
    let catMapping = {
      'cat-s': 'small',
      'cat-m': 'medium',
      'cat-l': 'large'
    }
    if (value == null) {
      return null;
    }
    return value.filter((item) => {
      return args[0] === 'sizes' ? item.type === catMapping[args[1]] :  item.status === args[0];
    });
  }
}
