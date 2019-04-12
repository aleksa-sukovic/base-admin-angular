import { AbstractControl } from '@angular/forms';

export interface Attribute
{
    name: string;
    validator: any;
    apply?: (attribute: Attribute, value: any, control: AbstractControl) => void;
}
