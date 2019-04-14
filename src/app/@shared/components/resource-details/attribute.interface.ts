import { AbstractControl } from '@angular/forms';

export interface Attribute
{
    name: string;
    validator: any;
    apply?: (field: AbstractControl) => any;
    init?: (value: any) => any;
}
