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
    protected locales: Locale[] = [];

    constructor(injector: Injector)
    {
        super(injector);

        this.resourceService = injector.get(LocaleService);
        this.locales = LocaleService.available;
    }

    protected getFillable(): Attribute[]
    {
        let fillables = [
            {
                name: 'code',
                validator: Validators.required,
                apply: (field: any) => {
                    return field.value;
                }
            }
        ];

        for (let locale of LocaleService.available) {
            fillables.push({
                name: locale.code,
                validator: Validators.required,
                apply: field => {
                    let translation = this.resource.translations.find(item => item.locale_id == locale.id);

                    if (!translation) {
                        translation = new LocaleTranslation({ name: field.value, locale_id: this.resource.id, locale_parent_id: locale.id });
                        this.resource.translations.push(translation);
                    }

                    translation.name = field.value;
                }
            });
        }

        return fillables;
    }

    protected getTranslationFillable(): Attribute[]
    {
        return [];
    }
}
