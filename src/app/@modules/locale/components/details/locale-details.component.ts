import { Component, Injector } from '@angular/core';
import { Locale } from '../../models/locale.model';
import { Validators } from '@angular/forms';
import { Attribute } from 'src/app/@shared/components/resource-details/attribute.interface';
import { LocaleTranslation } from '../../models/locale.translation.model';
import { TranslatedResourceDetailsComponent } from 'src/app/@shared/components/resource-details/translated-resource-details.component';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'locale-details',
  templateUrl: './locale-details.component.html',
  styleUrls: ['./locale-details.component.scss']
})
export class LocaleDetailsComponent extends TranslatedResourceDetailsComponent<Locale, LocaleTranslation, LocaleService>
{
    protected baseUrl = 'locales';

    constructor(injector: Injector)
    {
        super(injector);

        this.resourceService = injector.get(LocaleService);
    }

    protected getFillable(): Attribute[]
    {
        return [
            {
                name: 'code',
                validator: Validators.required,
                apply: field => {
                    return field.value;
                }
            }
        ];
    }

    protected getTranslationFillable(): Attribute[]
    {
        return [
            {
                name: 'name',
                validator: Validators.required,
                apply: field => {
                    this.resource.translation.name = field.value;
                }
            }
        ];
    }
}
