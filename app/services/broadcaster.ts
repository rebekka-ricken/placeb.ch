import {Injectable, EventEmitter} from 'angular2/core';

@Injectable()
export class Broadcaster extends EventEmitter<any> {}
