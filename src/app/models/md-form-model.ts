import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

export abstract class MDFormControl extends FormControl {

    constructor(
        // initial value
        formState: any,
        // name of the field
        public label: string,
        // description to display next to the field
        public description: string,
        private optionalParams: OptionalParams) {

        super(formState);
        // add default values to missing attributes
        this.optionalParams = {
            ...{
                optional: false,
                validators: [],
                dependsOn: () => [],
                onDependencyChange: () => null,
                childs: () => []
            },
            ...this.optionalParams
        };
        this.initValidators();
    }

    get optional() { return this.optionalParams.optional; }
    get dependsOn() { return this.optionalParams.dependsOn; }
    get onDependencyChange() { return this.optionalParams.onDependencyChange; }

    public initValidators() {
        const optionalValidator = this.optionalParams.optional ? [] : [Validators.required];
        this.setValidators(optionalValidator.concat(this.optionalParams.validators));
    }
}

interface OptionalParams {

    // if false, it is a required control
    optional?: boolean;

    // getter the other controls that it depends on
    dependsOn?: () => Array<MDFormControl>;

    // callback to be executed when a dependency changes
    onDependencyChange?: (c: MDFormControl) => void;

    // usual validators
    validators?: ValidatorFn[];
}

export class MDSelectFormControl extends MDFormControl {

    public syncOptions: Array<SelectOption> = [];

    constructor(
        formState: any,
        label: string,
        description: string,
        private options: Array<SelectOption> | Observable<Array<SelectOption>>,
        optionalParams?: OptionalParams) {

        super(
            formState,
            label,
            description,
            optionalParams);

        if (options instanceof Observable) {
            options.subscribe(opts => this.setSyncOptions(opts));
        } else if (options instanceof Array) {
            this.setSyncOptions(options);
        }

    }

    public setSyncOptions(newOptions: Array<SelectOption>) {
        this.syncOptions = newOptions;
    }
}

interface SelectOption {
    key: string;
    value: string;
}


export class MDInputFormControl extends MDFormControl {
    constructor(
        formState: any,
        label: string,
        description: string,
        public inputType: string = 'text',
        optionalParams?: OptionalParams) {

        super(formState, label, description, optionalParams);
    }
}