import { Component } from '@angular/core';
import { ResourceDetailsComponent } from 'src/app/@shared/components/resource-details/resource-details.component';
import { Locale } from '../../models/locale.model';
import { Validators } from '@angular/forms';
import { Attribute } from 'src/app/@shared/components/resource-details/attribute.interface';

@Component({
  selector: 'locale-details',
  templateUrl: './locale-details.component.html',
  styleUrls: ['./locale-details.component.scss']
})
export class LocaleDetailsComponent extends ResourceDetailsComponent<Locale>
{

    getFillable(): Attribute[]
    {
        return [
            {
                name: 'code',
                validator: Validators.required,
                apply: (attribute, value, control) => {
                    this.resource[attribute.name] = value + '_transformed';

                    console.log('Code transformer', value, control);
                }
            },
            {
                name: 'name',
                validator: Validators.required,
                apply: (attribute, value, control) => {
                    this.resource[attribute.name] = value + '_transformed';

                    console.log('Name transformer', value, control);
                }
            }
        ];
    }
}
