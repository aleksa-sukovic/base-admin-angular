import { AbstractControl } from '@angular/forms';

export interface Attribute
{
    name: string;
    validator: any;
    apply?: (attribute: Attribute, field: AbstractControl) => any;
}
