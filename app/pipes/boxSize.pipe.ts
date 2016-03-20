import {Pipe} from 'angular2/core';
import {LocalizePipe} from "./localization.pipe";
import {en} from '../i18n/en';
import {de} from '../i18n/de';

@Pipe({
    name: 'boxSize',
})
export class BoxSizePipe {

    /**
     *
     * @type Array
     */
    public locales = {
        'en': en,
        'de': de
    };

    /**
     * @type {number}
     */
    private width:number = 0;

    /**
     * @type {number}
     */
    private height:number = 0;

    /**
     * @type {number}
     */
    private depth:number = 0;

    /**
     * @param value any
     * @param args array
     * @returns {string}
     */
    transform(value:any, args:any[]) {

        var locale = args[0] ? args[0] : 'en';

        this.width = value.width || value.avgWidth;
        this.height = value.height || value.avgHeight;
        this.depth = value.depth || value.avgDepth;

        var volume = this.calculateVolume();

        var area = this.calculateArea();

        var size = this.getCm(this.width) + ' cm x ' + this.getCm(this.depth) + ' cm, ' + this.locales[locale]['height'] + ': ' + this.getCm(this.height) + ' cm; ';

        return size + area + ' m2 / ' + volume + ' m3';
    }


    private calculateVolume() {

        return (this.getMeters(this.depth) * this.getMeters(this.width) * this.getMeters(this.height)).toFixed(2);
    }

    private calculateArea() {
        return (this.getMeters(this.depth) * this.getMeters(this.width)).toFixed(2);
    }


    private getCm(value):number {
        return Math.floor(value / 10);
    }

    private getMeters(value):number {
        return this.getCm(value) / 100;
    }
}
