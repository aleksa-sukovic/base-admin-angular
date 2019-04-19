import { Injectable } from '@angular/core';
import { LocaleService } from '../services/locale.service';

@Injectable({
    providedIn: 'root'
})
export class LocaleInitializer
{
    constructor(private localeService: LocaleService)
    {
        //
    }

    public init(): Promise<void>
    {
        return new Promise<void>(resolve => {
            this.localeService.all({ include: 'translation' }).subscribe(locales => {
                this.localeService.init(locales.getCollection());

                resolve();
            });
        });
    }
}
