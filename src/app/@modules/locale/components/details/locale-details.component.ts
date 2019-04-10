import { Component } from '@angular/core';
import { ResourceDetailsComponent } from 'src/app/@shared/components/resource-details/resource-details.component';
import { Locale } from '../../models/locale.model';
import { FormGroup, Validators } from '@angular/forms';
import { Attribute } from 'src/app/@shared/components/resource-details/attribute.interface';

@Component({
  selector: 'locale-details',
  templateUrl: './locale-details.component.html',
  styleUrls: ['./locale-details.component.scss']
})
export class LocaleDetailsComponent extends ResourceDetailsComponent<Locale>
{

    initializeForm(): FormGroup
    {
        this.resource = new Locale({id: 1, code: 'en'});

        return null;
    }

    getFillable(): Attribute[]
    {
        return [
            { name: 'id', validator: Validators.required },
            { name: 'code', validator: Validators.required}
        ];
    }

    getTranslationFillable(): Attribute[]
    {
        return [
            { name: 'name', validator: Validators.required }
        ];
    }
}
