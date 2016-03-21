import { Control,Validators } from "angular2/common";
import {ControlGroup} from "angular2/common";

interface ValidationResult {
    [key:string]:boolean;
}

export class ExtendedValidators extends Validators {

    static duration(control:Control):ValidationResult {
        if (control.value != "" && control.value == "default") {
            return {"defaultValue": true};
        }

        return null;
    }


    static email(control:Control):ValidationResult {
        let emailRE = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if ( !emailRE.test(control.value) ) {
            return {"emailInvalid": true};
        }

        return null;
    }

    static equals(src: string, val: string) {
        return (group: ControlGroup): {[key: string]: any} => {
            let srcControl = group.controls[src];
            let valControl = group.controls[val];
            if (srcControl.value !== valControl.value) {
                return {
                    mismatched: true
                };
            }
        }
    }

}