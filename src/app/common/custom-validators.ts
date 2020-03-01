import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

    static compareWith(controlNameToCompare: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }

            const controlToCompare = control.root.get(controlNameToCompare);

            return controlToCompare && controlToCompare.value !== control.value ? {mismatch: true} : null;
        };
    }
}
