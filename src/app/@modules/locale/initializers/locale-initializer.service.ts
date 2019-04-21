import { Injectable } from '@angular/core';
import { LocaleService } from '../services/locale.service';
import { TranslatorService } from '../services/translator.service';

@Injectable({
    providedIn: 'root'
})
export class LocaleInitializer
{
    constructor(private localeService: LocaleService, private translatorService: TranslatorService)
    {
        //
    }

    public init(): Promise<void>
    {
        return new Promise<void>(resolve => {
            this.localeService.all({ include: 'translation' }).subscribe(locales => {
                this.localeService.init(locales.getCollection());

                this.initTranslator(resolve);
            });
        });
    }

    protected initTranslator(resolve: any)
    {
        this.translatorService.init(LocaleService.current).then(() => {
            resolve();
        });
    }
}
